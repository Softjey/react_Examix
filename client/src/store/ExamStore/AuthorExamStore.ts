import { makeAutoObservable } from 'mobx';
import { Socket } from 'socket.io-client';
import ApiClient from '../../services/Api/ApiClient';
import { Test } from '../../types/api/entities/test';
import Message from './types/Message';
import WsException from './ws/types/WsException';
import WsApiError from './ws/WsApiError';
import { AuthorConnectedResponse } from './ws/types/responses/ConnectedResponse';
import Student from './types/Student';
import { AuthorEmitter } from './types/Emitter';
import { AuthorStoresExam, TempResults } from './types/StoresExam';
import parseTempResultsIntoTestQuestionWithResults from '../../utils/parseTempResultsIntoTestQuestionWithResults';
import { DetailedExam } from '../../types/api/entities/detailedExam';
import { AuthorExamCredentials } from '../../services/storage/StorageMap';
import createAuthorSocket from './utils/createAuthorSocket';
import createOffHandlers from './utils/createOffHandlers';

class AuthorExamStore {
  private socket: Socket | null = null;
  credentials: AuthorExamCredentials | null = null;
  exam: AuthorStoresExam | null = null;
  status: 'idle' | 'created' | 'started' | 'finished' = 'idle';

  constructor() {
    makeAutoObservable(this);
  }

  async createExam(testId: Test['id']) {
    if (this.socket) return;

    const credentials = await ApiClient.createExam(testId);

    await this.connectToExam(credentials);
  }

  private connectToExam(credentials: AuthorExamCredentials) {
    return new Promise<void>((resolve, reject) => {
      const socket = createAuthorSocket(credentials);
      const offHandlers = createOffHandlers(socket, {
        [Message.EXCEPTION]: onConnectError,
        [Message.CONNECTED]: onConnect,
      });

      const handleConnect = ({ test, students }: AuthorConnectedResponse) => {
        this.status = 'created';
        this.exam = { test, students, currentQuestion: null, results: null, id: null };
        this.credentials = credentials;
        this.socket = socket;
      };

      function onConnectError(error: WsException) {
        offHandlers();
        reject(new WsApiError(error));
      }

      function onConnect(response: AuthorConnectedResponse) {
        handleConnect(response);
        offHandlers();
        resolve();
      }

      socket.once(Message.CONNECTED, onConnect);
      socket.once(Message.EXCEPTION, onConnectError);

      this.addListeners(socket);
      socket.connect();
    });
  }

  startExam() {
    return new Promise<void>((resolve, reject) => {
      const { socket } = this;

      if (!socket) return;

      const offHandlers = createOffHandlers(socket, {
        [Message.EXAM_STARTED]: onExamStarted,
        [Message.EXCEPTION]: onExamStartError,
      });

      const handleExamStart = () => {
        this.status = 'started';
      };

      function onExamStarted() {
        resolve();
        handleExamStart();
        offHandlers();
      }

      function onExamStartError(error: WsApiError) {
        offHandlers();
        reject(new WsApiError(error));
      }

      socket.emit(AuthorEmitter.START_EXAM);
      socket.once(Message.EXAM_STARTED, onExamStarted);
      socket.once(Message.EXCEPTION, onExamStartError);
    });
  }

  private addListeners(socket: Socket) {
    this.onStudentJoined(socket);
    this.onStudentReconnected(socket);
    this.onResults(socket);
    this.onExamFinished(socket);
    this.onStudentLeave(socket);
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

  private onResults(socket: Socket) {
    socket.on(Message.RESULTS, (results: TempResults) => {
      if (!this.exam) return;
      const testQuestionsResults = parseTempResultsIntoTestQuestionWithResults(
        this.exam.test,
        results,
      );

      this.exam.results = testQuestionsResults;
    });
  }

  private onExamFinished(socket: Socket) {
    socket.on(Message.EXAM_FINISHED, (detailedExam: DetailedExam) => {
      if (!this.exam) return;

      this.exam.id = detailedExam.id;
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

const authorExamStore = new AuthorExamStore();

export default authorExamStore;
