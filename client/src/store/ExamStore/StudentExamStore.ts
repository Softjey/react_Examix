import { makeAutoObservable, runInAction } from 'mobx';
import { Socket } from 'socket.io-client';
import Message from './types/Message';
import WsApiError from '../../services/Api/ws/WsApiError';
import WsException from '../../services/Api/ws/types/WsException';
import { StudentConnectedResponse } from './types/responses/ConnectedResponse';
import { RawExamCurrentQuestion } from '../../types/api/entities/testQuestion';
import { StudentAnswer } from '../../types/api/entities/question';
import { StudentEmitter } from './types/Emitter';
import { StudentStoresExam } from './types/StoresExam';
import storage from '../../services/storage';
import createStudentSocket, { Credentials } from './utils/createStudentSocket';
import createOffHandlers from './utils/createOffHandlers';
import { StudentReconnectedResponse } from './types/responses/ReconnectedResponse';
import prepareCurrentQuestion from './utils/prepareCurrentQuestion';
import ErrorMessage from './types/ErrorMessage';
// eslint-disable-next-line import/no-cycle
import { onStudentJoined, onStudentLeave, onStudentReconnected } from './utils/studentEvents';

export class StudentExamStore {
  private credentials: Required<Credentials> | null = null;
  private socket: Socket | null = null;
  exam: StudentStoresExam | null = null;
  status: 'idle' | 'created' | 'started' | 'finished' | 'deleted' = 'idle';

  constructor() {
    makeAutoObservable(this);
  }

  private async setCredentials(credentials: Required<Credentials>) {
    storage.write('student-exam-credentials', credentials);

    this.credentials = credentials;
  }

  async tryToReconnect() {
    const credentials = storage.read('student-exam-credentials');
    const { examCode, studentName, studentId, studentToken } = credentials ?? {};
    const someCredentialsAreMissing = !examCode || !studentName || !studentId || !studentToken;
    let credentialsDeleted = false;

    if (someCredentialsAreMissing || !credentials) {
      storage.remove('student-exam-credentials');
      return true;
    }

    await this.reconnectToExam(credentials).catch((error: WsApiError) => {
      const studentNotFound = error.message === ErrorMessage.STUDENT_ID_INCORRECT;
      const examNotFound = error.message === ErrorMessage.EXAM_NOT_FOUND;
      const invalidToken = error.message === ErrorMessage.INVALID_STUDENT_TOKEN;

      if (!studentNotFound && !examNotFound && !invalidToken) {
        throw error;
      }

      credentialsDeleted = true;
      storage.remove('student-exam-credentials');
    });

    return credentialsDeleted;
  }

  connectToExam({ examCode, studentName }: Pick<Credentials, 'examCode' | 'studentName'>) {
    return new Promise<void>((resolve, reject) => {
      const socket = createStudentSocket({ examCode, studentName });
      const offHandlers = createOffHandlers(socket, {
        [Message.CONNECTED]: onConnect,
        [Message.EXCEPTION]: onError,
      });

      const handleConnect = (...args: Parameters<StudentExamStore['handleConnect']>) => {
        this.handleConnect(...args);
      };

      function onError(error: WsException) {
        offHandlers();
        reject(new WsApiError(error));
      }

      function onConnect(response: StudentConnectedResponse) {
        const { studentId, studentToken, students, test } = response;
        const credentials = { studentId, studentToken, examCode, studentName };

        handleConnect(socket, credentials, { students, test });
        offHandlers();
        resolve();
      }

      this.addListeners(socket);
      socket.once(Message.EXCEPTION, onError);
      socket.once(Message.CONNECTED, onConnect);
      socket.connect();
    });
  }

  sendAnswer(answers: StudentAnswer[]) {
    if (!this.socket || !this.credentials || !this.exam?.currentQuestion) return;
    const { studentId, studentToken } = this.credentials;

    this.socket.emit(StudentEmitter.ANSWER, {
      studentId,
      studentToken,
      questionIndex: this.exam.currentQuestion.index,
      answers,
    });
  }

  resetExam() {
    runInAction(() => {
      this.socket?.disconnect();
      this.socket = null;
      this.credentials = null;
      this.exam = null;
      this.status = 'idle';
    });
  }

  private reconnectToExam(credentials: Required<Credentials>) {
    return new Promise<void>((resolve, reject) => {
      const socket = createStudentSocket(credentials);
      const offHandlers = createOffHandlers(socket, {
        [Message.EXCEPTION]: onError,
        [Message.RECONNECTED]: onReconnect,
      });

      const handleReconnect = (response: StudentReconnectedResponse) => {
        const { students, test, examStatus, currentQuestion } = response;

        this.exam = { test, students, currentQuestion: prepareCurrentQuestion(currentQuestion) };
        this.setCredentials(credentials);
        this.status = examStatus;
        this.socket = socket;
      };

      function onReconnect(response: StudentReconnectedResponse) {
        handleReconnect(response);
        offHandlers();
        resolve();
      }

      function onError(error: WsException) {
        offHandlers();
        reject(new WsApiError(error));
      }

      this.addListeners(socket);
      socket.once(Message.RECONNECTED, onReconnect);
      socket.once(Message.EXCEPTION, onError);
      socket.connect();
    });
  }

  private addListeners(socket: Socket) {
    onStudentJoined.call(this, socket);
    onStudentReconnected.call(this, socket);
    onStudentLeave.call(this, socket);

    socket.on(Message.EXAM_STARTED, this.handleExamStart.bind(this));
    socket.on(Message.QUESTION, this.handleQuestion.bind(this));
    socket.on(Message.EXAM_DELETED, this.handleExamDeleted.bind(this));
    socket.on(Message.EXAM_FINISHED, this.handleExamFinished.bind(this));
  }

  private handleConnect(
    socket: Socket,
    credentials: Required<Credentials>,
    { students, test }: Pick<StudentConnectedResponse, 'test' | 'students'>,
  ) {
    this.exam = { test, students, currentQuestion: null };
    this.setCredentials(credentials);
    this.status = 'created';
    this.socket = socket;
  }

  private handleExamStart() {
    this.status = 'started';
  }

  private handleQuestion(rawQuestion: RawExamCurrentQuestion) {
    if (!this.exam) return;

    this.exam.currentQuestion = prepareCurrentQuestion(rawQuestion);
  }

  private handleExamDeleted() {
    storage.remove('student-exam-credentials');
    this.status = 'deleted';
  }

  private handleExamFinished() {
    storage.remove('student-exam-credentials');
    this.status = 'finished';
  }
}

const studentExamStore = new StudentExamStore();

export default studentExamStore;
