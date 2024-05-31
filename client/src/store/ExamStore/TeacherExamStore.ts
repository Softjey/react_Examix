import { makeAutoObservable } from 'mobx';
import { Socket, io } from 'socket.io-client';
import ApiClient from '../../services/Api/ApiClient';
import { Test } from '../../types/api/entities/test';

class TeacherExamStore {
  private socket: Socket | null = null;
  status: 'idle' | 'created' = 'idle';

  constructor() {
    makeAutoObservable(this);
  }

  async createExam(testId: Test['id']) {
    if (this.socket) return;

    const { authorToken, examCode } = await ApiClient.createExam(testId);

    this.socket = io(`${import.meta.env.VITE_SERVER_WS_URL}/join-exam`, {
      auth: {
        role: 'author',
        authorToken,
        examCode,
      },
      autoConnect: false,
    });

    this.socket.connect();
    this.status = 'created';
  }

  connectToExam() {}
}

const teacherExamStore = new TeacherExamStore();

export default teacherExamStore;
