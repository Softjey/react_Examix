import { makeAutoObservable } from 'mobx';
import { Socket, io } from 'socket.io-client';
import ApiClient from '../../services/Api/ApiClient';
import { Test } from '../../types/api/entities/test';
import Message from './types/Message';
import WsException from './ws/types/WsException';
import WsApiError from './ws/WsApiError';
import { AuthorConnectedResponse } from './ws/types/responses/ConnectedResponse';
import { AuthorAuth } from './types/auth';
import Student from './types/Student';
import { AuthorEmitter } from './types/Emitter';
import { AuthorStoresExam, TempResults } from './types/StoresExam';
import parseTempResultsIntoTestQuestionWithResults from '../../utils/parseTempResultsIntoTestQuestionWithResults';
import { DetailedExam } from '../../types/api/entities/detailedExam';

class AuthorExamStore {
  private socket: Socket | null = null;
  auth: Required<AuthorAuth> | null = null;
  exam: AuthorStoresExam | null = null;
  status: 'idle' | 'created' | 'started' | 'finished' = 'idle';

  constructor() {
    makeAutoObservable(this);
  }

  async createExam(testId: Test['id']) {
    if (this.socket) return;

    const { authorToken, examCode } = await ApiClient.createExam(testId);

    await this.connectToExam(authorToken, examCode);
  }

  private connectToExam(authorToken: string, examCode: string) {
    return new Promise<void>((resolve, reject) => {
      const socket = io(`${import.meta.env.VITE_SERVER_WS_URL}/join-exam`, {
        auth: { role: 'author', authorToken, examCode } as AuthorAuth,
        autoConnect: false,
      });

      const connectActions = ({ test, students }: AuthorConnectedResponse) => {
        this.status = 'created';
        this.exam = { test, students, currentQuestion: null, results: null, id: null };
        this.auth = { role: 'author', authorToken, examCode };
        this.socket = socket;
      };

      const disableHandlers = () => {
        socket.off(Message.EXCEPTION, onConnectError);
        socket.off(Message.CONNECTED, onConnect);
      };

      function onConnectError(error: WsException) {
        disableHandlers();
        reject(new WsApiError(error));
      }

      function onConnect(response: AuthorConnectedResponse) {
        connectActions(response);
        disableHandlers();
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
      if (!this.socket) return;

      this.socket.emit(AuthorEmitter.START_EXAM);

      const onStart = () => {
        this.status = 'started';
      };
      const disableHandlers = () => {
        this.socket?.off(Message.EXAM_STARTED, onExamStarted);
        this.socket?.off(Message.EXCEPTION, onExamStartError);
      };

      function onExamStarted() {
        resolve();
        onStart();
        disableHandlers();
      }

      function onExamStartError(error: WsApiError) {
        disableHandlers();
        reject(new WsApiError(error));
      }

      this.socket.once(Message.EXAM_STARTED, onExamStarted);
      this.socket.once(Message.EXCEPTION, onExamStartError);
    });
  }

  private addListeners(socket: Socket) {
    this.onStudentJoined(socket);
    this.onStudentReconnected(socket);
    this.onResults(socket);
    this.onExamFinished(socket);
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
    this.auth = null;
    this.exam = null;
    this.status = 'idle';
  }
}

const authorExamStore = new AuthorExamStore();

export default authorExamStore;
