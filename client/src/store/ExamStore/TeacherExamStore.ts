import { makeAutoObservable } from 'mobx';
import { Socket, io } from 'socket.io-client';
import ApiClient from '../../services/Api/ApiClient';
import { Test } from '../../types/api/entities/test';
import Message from './types/Message';
import WsException from '../../services/Api/ws/types/WsException';
import WsApiError from '../../services/Api/ws/WsApiError';
import ConnectedResponse from '../../services/Api/ws/types/responses/ConnectedResponse';
import { DetailedTest } from '../../types/api/entities/detailedTest';

class TeacherExamStore {
  private EXAM_CODE_KEY = 'examCode';
  private AUTHOR_TOKEN_KEY = 'authorToken';
  private socket: Socket | null = null;
  examCode: string | null = null;
  test: DetailedTest | null = null;
  error: WsException | null = null;
  status: 'idle' | 'ongoing' = 'idle';
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    const examCode = localStorage.getItem(this.EXAM_CODE_KEY);
    const authorToken = localStorage.getItem(this.AUTHOR_TOKEN_KEY);

    if (examCode && authorToken) {
      this.connectToExam(authorToken, examCode).catch(() => {
        localStorage.removeItem(this.EXAM_CODE_KEY);
        localStorage.removeItem(this.AUTHOR_TOKEN_KEY);
      });
    }
  }

  async createExam(testId: Test['id']) {
    if (this.socket) return;

    const { authorToken, examCode } = await ApiClient.createExam(testId);

    localStorage.setItem(this.EXAM_CODE_KEY, examCode);
    localStorage.setItem(this.AUTHOR_TOKEN_KEY, authorToken);

    await this.connectToExam(authorToken, examCode);
  }

  connectToExam(authorToken: string, examCode: string) {
    this.isLoading = true;
    this.error = null;

    return new Promise<void>((resolve, reject) => {
      const socket = io(`${import.meta.env.VITE_SERVER_WS_URL}/join-exam`, {
        auth: {
          role: 'author',
          authorToken,
          examCode,
        },
        autoConnect: false,
      });

      socket.on(Message.EXCEPTION, (error: WsException) => {
        reject(new WsApiError(error));
        this.isLoading = false;
        this.error = error;
      });

      socket.on(Message.CONNECTED, ({ test }: ConnectedResponse) => {
        this.isLoading = false;
        this.status = 'ongoing';
        this.socket = socket;
        this.test = test;
        this.examCode = examCode;
        resolve();
      });

      socket.connect();
    });
  }
}

const teacherExamStore = new TeacherExamStore();

export default teacherExamStore;
