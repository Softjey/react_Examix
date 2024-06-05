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
          studentToken: undefined, // will be loaded from local storage
          studentId: undefined,
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

      this.socket.on(Message.CONNECTED, ({ test, students }: StudentConnectedResponse) => {
        setExam({ test, students });
      });

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
}

const studentExamStore = new StudentExamStore();

export default studentExamStore;
