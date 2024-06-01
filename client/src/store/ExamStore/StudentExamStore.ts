import { makeAutoObservable } from 'mobx';
import { Socket, io } from 'socket.io-client';
import Message from './types/Message';
import WsException from './ws/types/WsException';
import WsApiError from './ws/WsApiError';
import { StudentConnectedResponse } from './ws/types/responses/ConnectedResponse';
import { StudentAuth } from './types/auth';
import { StudentTest } from './ws/types/StudentTest';

class StudentExamStore {
  private EXAM_CODE_KEY = 'examCode';
  private STUDENT_TOKEN_KEY = 'studentToken';
  private STUDENT_ID_KEY = 'studentId';
  private STUDENT_NAME_KEY = 'studentName';
  private socket: Socket | null = null;
  examCode: string | null = null;
  test: StudentTest | null = null;
  error: WsException | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    const examCode = localStorage.getItem(this.EXAM_CODE_KEY);
    const studentName = localStorage.getItem(this.STUDENT_NAME_KEY);
    const studentToken = localStorage.getItem(this.STUDENT_TOKEN_KEY);
    const studentId = localStorage.getItem(this.STUDENT_ID_KEY);

    if (examCode && studentToken && studentId && studentName) {
      this.connectToExam({ examCode, studentId, studentToken, studentName })
        .then(() => {})
        .catch(() => {
          localStorage.removeItem(this.EXAM_CODE_KEY);
          localStorage.removeItem(this.STUDENT_TOKEN_KEY);
          localStorage.removeItem(this.STUDENT_ID_KEY);
        });
    }
  }

  connectToExam({ examCode, studentId, studentToken, studentName }: Omit<StudentAuth, 'role'>) {
    this.isLoading = true;
    this.error = null;

    return new Promise<void>((resolve, reject) => {
      const socket = io(`${import.meta.env.VITE_SERVER_WS_URL}/join-exam`, {
        auth: {
          role: 'student',
          examCode,
          studentName,
          studentToken,
          studentId,
        } as StudentAuth,
        autoConnect: false,
      });

      socket.on(Message.EXCEPTION, (error: WsException) => {
        reject(new WsApiError(error));
        this.isLoading = false;
        this.error = error;
      });

      socket.on(Message.CONNECTED, ({ test }: StudentConnectedResponse) => {
        this.isLoading = false;
        this.socket = socket;
        this.test = test;
        this.examCode = examCode;
        resolve();
      });

      Object.values(Message).forEach((message) => {
        socket.on(message, (data: unknown) => {
          // eslint-disable-next-line no-console
          console.log(message, data);
        });
      });

      socket.connect();
    });
  }
}

const studentExamStore = new StudentExamStore();

export default studentExamStore;
