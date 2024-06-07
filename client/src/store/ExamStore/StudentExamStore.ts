import { makeAutoObservable } from 'mobx';
import { Socket, io } from 'socket.io-client';
import Message from './types/Message';
import WsException from './ws/types/WsException';
import WsApiError from './ws/WsApiError';
import { StudentConnectedResponse } from './ws/types/responses/ConnectedResponse';
import { StudentAuth } from './types/auth';
import Student from './types/Student';
import { StudentQuestion } from '../../types/api/entities/testQuestion';
import { StudentAnswer } from '../../types/api/entities/question';
import { StudentEmitter } from './types/Emitter';
import { StudentStoresExam } from './types/StoresExam';

class StudentExamStore {
  private auth: Required<StudentAuth> | null = null;
  private socket: Socket | null = null;
  exam: StudentStoresExam | null = null;
  error: WsException | null = null;
  status: 'idle' | 'created' | 'started' | 'finished' = 'idle';
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  connectToExam({ examCode, studentName }: Omit<StudentAuth, 'role'>) {
    this.isLoading = true;
    this.error = null;

    return new Promise<void>((resolve, reject) => {
      const socket = io(`${import.meta.env.VITE_SERVER_WS_URL}/join-exam`, {
        auth: {
          role: 'student',
          examCode,
          studentName,
          studentToken: undefined, // will be loaded from local storage
          studentId: undefined,
        } as StudentAuth,
        autoConnect: false,
      });

      const setExam = ({ test, students }: Pick<StudentConnectedResponse, 'test' | 'students'>) => {
        this.isLoading = false;
        this.exam = { test, students, currentQuestion: null };
        this.status = 'created';
        this.socket = socket;

        resolve();
      };

      socket.on(Message.EXCEPTION, (error: WsException) => {
        reject(new WsApiError(error));
        this.isLoading = false;
        this.error = error;
      });

      socket.on(Message.CONNECTED, (data: StudentConnectedResponse) => {
        const { studentId, studentToken, students, test } = data;

        this.auth = {
          role: 'student',
          studentId,
          studentToken,
          examCode,
          studentName,
        };

        setExam({ students, test });
      });
      socket.on(Message.RECONNECTED, setExam);
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

  private addListeners(socket: Socket) {
    this.onExamStart(socket);
    this.onStudentJoined(socket);
    this.onStudentReconnected(socket);
    this.onQuestion(socket);
    this.onExamFinished(socket);
  }

  private onExamStart(socket: Socket) {
    socket.on(Message.EXAM_STARTED, () => {
      this.status = 'started';
    });
  }

  sendAnswer(answers: StudentAnswer[]) {
    if (!this.socket || !this.auth || !this.exam?.currentQuestion) return;
    const { studentId, studentToken } = this.auth;

    this.socket.emit(StudentEmitter.ANSWER, {
      studentId,
      studentToken,
      questionIndex: this.exam.currentQuestion.index,
      answers,
    });
  }

  private onQuestion(socket: Socket) {
    socket.on(Message.QUESTION, (question: StudentQuestion) => {
      if (!this.exam) return;

      this.exam.currentQuestion = question;
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

  private onExamFinished(socket: Socket) {
    socket.on(Message.EXAM_FINISHED, () => {
      if (!this.exam) return;

      this.status = 'finished';
      this.exam.currentQuestion = null;
    });
  }

  resetExam() {
    this.socket?.disconnect();
    this.socket = null;
    this.auth = null;
    this.exam = null;
    this.error = null;
    this.status = 'idle';
    this.isLoading = false;
  }
}

const studentExamStore = new StudentExamStore();

export default studentExamStore;
