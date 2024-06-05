import { makeAutoObservable } from 'mobx';
import { Socket, io } from 'socket.io-client';
import ApiClient from '../../services/Api/ApiClient';
import { Test } from '../../types/api/entities/test';
import Message from './types/Message';
import WsException from './ws/types/WsException';
import WsApiError from './ws/WsApiError';
import { AuthorConnectedResponse } from './ws/types/responses/ConnectedResponse';
import { DetailedTest } from '../../types/api/entities/detailedTest';
import { AuthorAuth } from './types/auth';
import Student from './types/Student';
import { AuthorEmitter } from './types/Emitter';

class AuthorExamStore {
  private socket: Socket | null = null;
  examCode: string | null = null;
  test: DetailedTest | null = null;
  students: Student[] | null = null;
  error: WsException | null = null;
  status: 'idle' | 'ongoing' = 'idle';
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async createExam(testId: Test['id']) {
    if (this.socket) return;

    const { authorToken, examCode } = await ApiClient.createExam(testId);

    await this.connectToExam(authorToken, examCode);
  }

  connectToExam(authorToken: string, examCode: string) {
    this.isLoading = true;
    this.error = null;

    return new Promise<void>((resolve, reject) => {
      this.socket = io(`${import.meta.env.VITE_SERVER_WS_URL}/join-exam`, {
        auth: { role: 'author', authorToken, examCode } as AuthorAuth,
        autoConnect: false,
      });

      this.socket.on(Message.EXCEPTION, (error: WsException) => {
        reject(new WsApiError(error));
        this.isLoading = false;
        this.error = error;
      });

      this.socket.on(Message.CONNECTED, ({ test, students }: AuthorConnectedResponse) => {
        this.isLoading = false;
        this.status = 'ongoing';
        this.test = test;
        this.examCode = examCode;
        this.students = students;
        resolve();
      });

      this.socket.on(Message.STUDENT_JOINED, (student: Student) => {
        if (!this.students) return;
        this.students = [...this.students, student];
      });

      this.socket.on(Message.STUDENT_RECONNECTED, (student: Student) => {
        if (!this.students) return;
        this.students = this.students.map((s) => (s.studentId === student.studentId ? student : s));
      });

      Object.values(Message).forEach((message) => {
        this.socket?.on(message, (data: unknown) => {
          // eslint-disable-next-line no-console
          console.log(message, data);
        });
      });

      this.socket.connect();
    });
  }

  startExam() {
    if (!this.socket) return;

    this.socket.emit(AuthorEmitter.START_EXAM);
  }
}

const teacherExamStore = new AuthorExamStore();

export default teacherExamStore;
