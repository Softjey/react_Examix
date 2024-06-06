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

class AuthorExamStore {
  private socket: Socket | null = null;
  auth: Required<AuthorAuth> | null = null;
  exam: AuthorStoresExam | null = null;
  error: WsException | null = null;
  status: 'idle' | 'created' | 'started' = 'idle';
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async createExam(testId: Test['id']) {
    if (this.socket) return;

    const { authorToken, examCode } = await ApiClient.createExam(testId);

    await this.connectToExam(authorToken, examCode);
  }

  private connectToExam(authorToken: string, examCode: string) {
    this.isLoading = true;
    this.error = null;

    return new Promise<void>((resolve, reject) => {
      const socket = io(`${import.meta.env.VITE_SERVER_WS_URL}/join-exam`, {
        auth: { role: 'author', authorToken, examCode } as AuthorAuth,
        autoConnect: false,
      });

      socket.on(Message.EXCEPTION, (error: WsException) => {
        reject(new WsApiError(error));
        this.isLoading = false;
        this.error = error;
      });

      socket.on(Message.CONNECTED, ({ test, students }: AuthorConnectedResponse) => {
        this.isLoading = false;
        this.status = 'created';
        this.exam = { test, students, currentQuestion: null, results: null };
        this.auth = { role: 'author', authorToken, examCode };
        this.socket = socket;
        resolve();
      });

      this.addListeners(socket);

      Object.values(Message).forEach((message) => {
        socket.on(message, (data: unknown) => {
          // eslint-disable-next-line no-console
          console.log(message, data);
        });
      });

      socket.connect();
    });
  }

  startExam() {
    if (!this.socket) return;

    this.isLoading = true;
    this.socket.emit(AuthorEmitter.START_EXAM);
  }

  private addListeners(socket: Socket) {
    this.onExamStart(socket);
    this.onStudentJoined(socket);
    this.onStudentReconnected(socket);
    this.onResults(socket);
  }

  private onExamStart(socket: Socket) {
    socket.on(Message.EXAM_STARTED, () => {
      this.status = 'started';
      this.isLoading = false;
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
}

const authorExamStore = new AuthorExamStore();

export default authorExamStore;
