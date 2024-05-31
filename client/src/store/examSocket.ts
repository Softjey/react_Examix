import { makeAutoObservable } from 'mobx';
import { Socket, io } from 'socket.io-client';
import log from '../dev/log';
import { StudentAnswer, TestInfo } from '../dev/questions';

export enum MessageNames {
  EXCEPTION = 'exception',
  TEST_INFO = 'test-info',
  STUDENT_JOINED = 'student-joined',
  EXAM_STARTED = 'exam-started',
  QUESTION = 'question',
  RESULTS = 'results',
  EXAM_FINISHED = 'exam-finished',
  STUDENT_KICKED = 'student-kicked',
}

export enum ExamRole {
  STUDENT = 'student',
  AUTHOR = 'author',
}

interface StudentAuth {
  role: ExamRole.STUDENT;
  examCode: string;
  studentName: string;
  studentId?: string;
  studentToken?: string;
}

interface AuthorAuth {
  role: ExamRole.AUTHOR;
  examCode: string;
  authorToken: string;
}

type Auth = AuthorAuth | StudentAuth;
/*
interface Error {
  status: number;
  message: string | string[];
}
 */
interface CreateStudentSocketOptions {
  role: ExamRole.STUDENT;
  examCode: string;
  studentName: string;
}

interface CreateAuthorSocketOptions {
  role: ExamRole.AUTHOR;
  examCode: string;
  authorToken: string;
}

type CreateSocketOptions = CreateStudentSocketOptions | CreateAuthorSocketOptions;

class ExamStore {
  private socket: Socket | null = null;

  testInfo: TestInfo | null = null;

  private auth: Auth | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  /* status: 'error' | 'pending' | 'fullfilled' | 'inactive' = 'inactive';

  error: Error | null = null; */

  /* setStatus(status: 'error' | 'pending' | 'fullfilled' | 'inactive') {
    this.status = status;
  } */

  setSocket(socket: Socket) {
    this.socket = socket;
  }

  createSocket(options: CreateSocketOptions) {
    if (options !== null) {
      this.auth =
        options.role === ExamRole.STUDENT
          ? this.createStudentAuth(options)
          : this.createAuthorAuth(options);
      // eslint-disable-next-line no-console
      console.log('auth obj:', this.auth);
    }
    if (this.auth === null) {
      throw new Error('expected auth not to equal null');
    }
    const socket = io(`${import.meta.env.VITE_SERVER_HTTP_URL}/join-exam`, { auth: this.auth });

    socket.on(MessageNames.TEST_INFO, (body) => {
      this.testInfo = body;
    });
    // eslint-disable-next-line no-console
    socket.io.on('open', () => console.log('connected', socket));
    socket.io.on('close', log('connection closed'));
    // eslint-disable-next-line no-console
    socket.io.on('error', (body) => console.log(body));

    this.setSocket(socket);
  }

  // FIXME: fix this "any" problem later :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(messageName: MessageNames, callback: (value?: any) => void) {
    if (this.socket) {
      this.socket.on(messageName, (value) => {
        callback(value);
      });
    }
  }

  onOpen(callback: () => void) {
    if (this.socket) {
      this.socket.io.on('open', callback);
    }
  }

  onClose(callback: () => void) {
    if (this.socket) {
      this.socket.io.on('close', callback);
    }
  }

  sendAnswer(questionIndex: number, answers: StudentAnswer[]) {
    if (this.socket !== null) {
      if (this.auth?.role === ExamRole.STUDENT) {
        this.socket.emit('answer', {
          questionIndex,
          answers,
          studentId: this.auth.studentId,
          studentToken: this.auth.studentToken,
        });
      }
    }
  }

  private createStudentAuth({ examCode, role, studentName }: CreateStudentSocketOptions) {
    const lsItem = localStorage.getItem('studentAuth');
    if (lsItem !== null) {
      const [studentId, studentToken] = lsItem.split('\n');
      // eslint-disable-next-line no-console
      console.log({ examCode, role, studentName, studentId, studentToken });
      return { examCode, role, studentName, studentId, studentToken };
    }
    // eslint-disable-next-line no-console
    console.log({ examCode, role, studentName });
    return { examCode, role, studentName };
  }

  private createAuthorAuth({ examCode, role, authorToken }: CreateAuthorSocketOptions) {
    return { examCode, role, authorToken };
  }
}

export default new ExamStore();
