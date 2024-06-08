import { makeAutoObservable } from 'mobx';
import { Socket } from 'socket.io-client';
import Message from './types/Message';
import WsException from './ws/types/WsException';
import WsApiError from './ws/WsApiError';
import { StudentConnectedResponse } from './ws/types/responses/ConnectedResponse';
import Student from './types/Student';
import { RawExamCurrentQuestion } from '../../types/api/entities/testQuestion';
import { StudentAnswer } from '../../types/api/entities/question';
import { StudentEmitter } from './types/Emitter';
import { StudentStoresExam } from './types/StoresExam';
import storage from '../../services/storage';
import createStudentSocket, { Credentials } from './utils/createStudentSocket';
import createOffHandlers from './utils/createOffHandlers';
import { StudentReconnectedResponse } from './ws/types/responses/ReconnectedResponse';
import prepareCurrentQuestion from './utils/prepareCurrentQuestion';
import ErrorMessage from './types/ErrorMessage';

class StudentExamStore {
  private credentials: Required<Credentials> | null = null;
  private socket: Socket | null = null;
  exam: StudentStoresExam | null = null;
  status: 'idle' | 'created' | 'started' | 'finished' = 'idle';

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

      const handleConnect = (
        { students, test }: Pick<StudentConnectedResponse, 'test' | 'students'>,
        credentials: Required<Credentials>,
      ) => {
        this.exam = { test, students, currentQuestion: null };
        this.setCredentials(credentials);
        this.status = 'created';
        this.socket = socket;
      };

      function onError(error: WsException) {
        offHandlers();
        reject(new WsApiError(error));
      }

      function onConnect(response: StudentConnectedResponse) {
        const { studentId, studentToken, students, test } = response;

        handleConnect({ students, test }, { studentId, studentToken, examCode, studentName });
        offHandlers();
        resolve();
      }

      this.addListeners(socket);
      socket.once(Message.EXCEPTION, onError);
      socket.once(Message.CONNECTED, onConnect);
      socket.connect();
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
    this.onExamStart(socket);
    this.onStudentJoined(socket);
    this.onStudentReconnected(socket);
    this.onStudentLeave(socket);
    this.onQuestion(socket);
    this.onExamFinished(socket);
  }

  private onExamStart(socket: Socket) {
    socket.on(Message.EXAM_STARTED, () => {
      this.status = 'started';
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

  private onQuestion(socket: Socket) {
    socket.on(Message.QUESTION, (rawQuestion: RawExamCurrentQuestion) => {
      if (!this.exam) return;

      this.exam.currentQuestion = prepareCurrentQuestion(rawQuestion);
    });
  }

  private onStudentJoined(socket: Socket) {
    socket.on(Message.STUDENT_JOINED, (student: Student) => {
      if (!this.exam) return;

      this.exam.students = [...this.exam.students, student];
    });
  }

  private onStudentReconnected(socket: Socket) {
    socket.on(Message.STUDENT_RECONNECTED, (student: Student) => {
      if (!this.exam) return;

      this.exam.students = this.exam.students.map((currStudent) => {
        return currStudent.studentId === student.studentId ? student : currStudent;
      });
    });
  }

  private onStudentLeave(socket: Socket) {
    socket.on(Message.STUDENT_DISCONNECTED, ({ studentId }: { studentId: string }) => {
      if (!this.exam) return;

      this.exam.students = this.exam.students.filter((student) => student.studentId !== studentId);
    });
  }

  private onExamFinished(socket: Socket) {
    socket.on(Message.EXAM_FINISHED, () => {
      if (!this.exam) return;

      storage.remove('student-exam-credentials');
      this.status = 'finished';
      this.exam.currentQuestion = null;
    });
  }

  resetExam() {
    this.socket?.disconnect();
    this.socket = null;
    this.credentials = null;
    this.exam = null;
    this.status = 'idle';
  }
}

const studentExamStore = new StudentExamStore();

export default studentExamStore;
