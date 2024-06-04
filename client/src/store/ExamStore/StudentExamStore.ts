import { makeAutoObservable } from 'mobx';
import { Socket, io } from 'socket.io-client';
import Message from './types/Message';
import WsException from './ws/types/WsException';
import WsApiError from './ws/WsApiError';
import { StudentConnectedResponse } from './ws/types/responses/ConnectedResponse';
import { StudentAuth } from './types/auth';
import { StudentTest } from './ws/types/StudentTest';
import Student from './types/Student';

class StudentExamStore {
  // private EXAM_CODE_KEY = 'examCode';
  private STUDENT_TOKEN_KEY = 'studentToken';
  private STUDENT_ID_KEY = 'studentId';
  // private STUDENT_NAME_KEY = 'studentName';
  private socket: Socket | null = null;
  examCode: string | null = null;
  test: StudentTest | null = null;
  students: Student[] | null = null;
  error: WsException | null = null;
  status: 'idle' | 'ongoing' = 'idle';
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  connectToExam({ examCode, studentName }: Omit<StudentAuth, 'role'>) {
    this.isLoading = true;
    this.error = null;

    return new Promise<void>((resolve, reject) => {
      this.socket = io(`${import.meta.env.VITE_SERVER_WS_URL}/join-exam`, {
        auth: {
          role: 'student',
          examCode,
          studentName,
          studentToken: sessionStorage.getItem(this.STUDENT_TOKEN_KEY),
          studentId: sessionStorage.getItem(this.STUDENT_ID_KEY),
        } as StudentAuth,
        autoConnect: false,
      });

      this.socket.on(Message.EXCEPTION, (error: WsException) => {
        reject(new WsApiError(error));
        this.isLoading = false;
        this.error = error;
      });

      const setExam = ({ test, students }: Pick<StudentConnectedResponse, 'test' | 'students'>) => {
        this.isLoading = false;
        this.test = test;
        this.students = students;
        this.examCode = examCode;
        this.status = 'ongoing';

        resolve();
      };

      this.socket.on(
        Message.CONNECTED,
        ({ test, students, studentToken, studentId }: StudentConnectedResponse) => {
          this.saveCredentials(studentToken, studentId);
          setExam({ test, students });
        },
      );

      this.socket.on(Message.RECONNECTED, setExam);
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

  saveCredentials(studentToken: string, studentId: string) {
    if (studentToken) {
      sessionStorage.setItem(this.STUDENT_TOKEN_KEY, studentToken);
    }

    if (studentId) {
      sessionStorage.setItem(this.STUDENT_ID_KEY, studentId);
    }
  }

  removeCredentials() {
    sessionStorage.removeItem(this.STUDENT_TOKEN_KEY);
    sessionStorage.removeItem(this.STUDENT_ID_KEY);
  }
}

const studentExamStore = new StudentExamStore();

export default studentExamStore;
