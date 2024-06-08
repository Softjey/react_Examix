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
import storage from '../../services/storage';

class StudentExamStore {
  private auth: Required<StudentAuth> | null = null;
  private socket: Socket | null = null;
  exam: StudentStoresExam | null = null;
  status: 'idle' | 'created' | 'started' | 'finished' = 'idle';

  constructor() {
    makeAutoObservable(this);
  }

  async tryToReconnect() {
    try {
      const { examCode, studentName } = storage.read('student-exam-credentials') ?? {};

      if (!examCode || !studentName) {
        throw new Error('No exam code or student name');
      }

      await this.connectToExam({ examCode, studentName });
    } catch (error) {
      if (error instanceof Error) {
        // якщо тут повідомлення що не правильний екзам код чи стюдент айді то видалити з стораджу
        // console.log(error.message);
      }

      throw error;
    }
  }

  connectToExam({ examCode, studentName }: Pick<StudentAuth, 'examCode' | 'studentName'>) {
    const { studentId, studentToken } = storage.read('student-exam-credentials') ?? {};

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

      const offHandlers = () => {
        socket.off(Message.EXCEPTION, onConnectError);
        socket.off(Message.CONNECTED, onConnect);
        socket.off(Message.RECONNECTED, onReconnect);
      };

      const setAuth = (data: Pick<StudentConnectedResponse, 'studentId' | 'studentToken'>) => {
        const { studentId: newId, studentToken: newToken } = data;

        storage.write('student-exam-credentials', {
          studentId: newId,
          studentToken: newToken,
          examCode,
          studentName,
        });

        this.auth = {
          role: 'student',
          studentId: data.studentId,
          studentToken: data.studentToken,
          examCode,
          studentName,
        };
      };

      const setExam = ({ test, students }: Pick<StudentConnectedResponse, 'test' | 'students'>) => {
        this.exam = { test, students, currentQuestion: null };
        this.status = 'created';
        this.socket = socket;

        resolve();
      };

      function onConnectError(error: WsException) {
        offHandlers();
        reject(new WsApiError(error));
      }

      function onConnect(response: StudentConnectedResponse) {
        const { studentId: newStudentId, studentToken: newStudentToken, students, test } = response;

        offHandlers();
        setAuth({ studentId: newStudentId, studentToken: newStudentToken });
        setExam({ students, test });
      }

      function onReconnect(response: Pick<StudentConnectedResponse, 'test' | 'students'>) {
        offHandlers();

        if (studentId && studentToken) {
          setAuth({ studentId, studentToken });
        }

        setExam(response);
      }

      socket.once(Message.EXCEPTION, onConnectError);
      socket.once(Message.CONNECTED, onConnect);
      socket.once(Message.RECONNECTED, onReconnect);

      this.addListeners(socket);
      socket.connect();
    });
  }

  private addListeners(socket: Socket) {
    this.onExamStart(socket);
    this.onStudentJoined(socket);
    this.onStudentReconnected(socket);
    this.onStudentLeave(socket);
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

  private onStudentLeave(socket: Socket) {
    socket.on(Message.STUDENT_DISCONNECTED, ({ studentId }: { studentId: string }) => {
      if (!this.exam) return;

      this.exam.students = this.exam.students.filter((student) => student.studentId !== studentId);
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
    this.status = 'idle';
  }
}

const studentExamStore = new StudentExamStore();

export default studentExamStore;
