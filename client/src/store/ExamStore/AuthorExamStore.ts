import { makeAutoObservable, runInAction } from 'mobx';
import { Socket } from 'socket.io-client';
import ApiClient from '../../services/Api/ApiClient';
import { Test } from '../../types/api/entities/test';
import Message from './types/Message';
import WsApiError from '../../services/Api/ws/WsApiError';
import WsException from '../../services/Api/ws/types/WsException';
import { AuthorConnectedResponse } from './types/responses/ConnectedResponse';
import { AuthorEmitter } from './types/Emitter';
import { AuthorStoresExam, TempResults } from './types/StoresExam';
import parseTempResultsIntoTestQuestionWithResults from '../../utils/parseTempResultsIntoTestQuestionWithResults';
import { DetailedExam } from '../../types/api/entities/detailedExam';
import { AuthorExamCredentials } from '../../services/storage/StorageMap';
import createAuthorSocket from './utils/createAuthorSocket';
import createOffHandlers from './utils/createOffHandlers';
import storage from '../../services/storage';
import ErrorMessage from './types/ErrorMessage';
// eslint-disable-next-line import/no-cycle
import { onStudentJoined, onStudentLeave, onStudentReconnected } from './utils/studentEvents';

export class AuthorExamStore {
  private socket: Socket | null = null;
  credentials: AuthorExamCredentials | null = null;
  exam: AuthorStoresExam | null = null;
  status: 'idle' | 'created' | 'started' | 'finished' = 'idle';

  constructor() {
    makeAutoObservable(this);

    const credentials = storage.read('author-exam-credentials');

    if (credentials) {
      this.connectToExam(credentials).catch((error: WsApiError) => {
        const examNotFound = error.message === ErrorMessage.EXAM_NOT_FOUND;
        const notAuthor = error.message === ErrorMessage.NOT_AUTHOR;

        if (examNotFound || notAuthor) {
          storage.remove('author-exam-credentials');
        }
      });
    }
  }

  private connectToExam(credentials: AuthorExamCredentials) {
    return new Promise<void>((resolve, reject) => {
      const socket = createAuthorSocket(credentials);
      const offHandlers = createOffHandlers(socket, {
        [Message.EXCEPTION]: onConnectError,
        [Message.CONNECTED]: onConnect,
      });

      const handleConnect = (response: AuthorConnectedResponse) => {
        this.handleConnect(socket, credentials, response);
      };

      function onConnectError(error: WsException) {
        offHandlers();
        reject(new WsApiError(error));
      }

      function onConnect(response: AuthorConnectedResponse) {
        handleConnect(response);
        offHandlers();
        resolve();
      }

      socket.once(Message.CONNECTED, onConnect);
      socket.once(Message.EXCEPTION, onConnectError);

      this.addListeners(socket);
      socket.connect();
    });
  }

  async createExam(testId: Test['id']) {
    if (this.socket) return;

    const { authorToken, examCode } = await ApiClient.createExam(testId);

    await this.connectToExam({ authorToken, examCode });
  }

  startExam() {
    return new Promise<void>((resolve, reject) => {
      const { socket } = this;

      if (!socket) return;

      const offHandlers = createOffHandlers(socket, {
        [Message.EXAM_STARTED]: onExamStarted,
        [Message.EXCEPTION]: onExamStartError,
      });

      const handleExamStart = () => this.handleExamStart();
      function onExamStarted() {
        resolve();
        handleExamStart();
        offHandlers();
      }

      function onExamStartError(error: WsApiError) {
        offHandlers();
        reject(new WsApiError(error));
      }

      socket.emit(AuthorEmitter.START_EXAM);
      socket.once(Message.EXAM_STARTED, onExamStarted);
      socket.once(Message.EXCEPTION, onExamStartError);
    });
  }

  deleteExam() {
    return new Promise<void>((resolve, reject) => {
      const { socket } = this;

      if (!socket) return;

      const offHandlers = createOffHandlers(socket, {
        [Message.EXCEPTION]: onError,
        [Message.EXAM_DELETED]: onExamDeleted,
      });

      const handleExamDeleted = () => this.resetExam();

      function onExamDeleted() {
        handleExamDeleted();
        offHandlers();
        resolve();
      }

      function onError(error: WsException) {
        offHandlers();
        reject(new WsApiError(error));
      }

      socket.once(Message.EXAM_DELETED, onExamDeleted);
      socket.once(Message.EXCEPTION, onError);

      socket.emit(AuthorEmitter.DELETE_EXAM);
    });
  }

  resetExam() {
    runInAction(() => {
      this.socket?.disconnect();
      this.socket = null;
      this.credentials = null;
      this.exam = null;
      this.status = 'idle';
    });
  }

  private addListeners(socket: Socket) {
    onStudentJoined.call(this, socket);
    onStudentReconnected.call(this, socket);
    onStudentLeave.call(this, socket);

    socket.on(Message.RESULTS, this.handleResults.bind(this));
    socket.on(Message.EXAM_FINISHED, this.handleExamFinished.bind(this));
  }

  private handleExamStart() {
    this.status = 'started';
  }

  private handleConnect(
    socket: Socket,
    credentials: AuthorExamCredentials,
    { test, students, results, examStatus }: AuthorConnectedResponse,
  ) {
    const parsedTestResults = parseTempResultsIntoTestQuestionWithResults(test, results);

    storage.write('author-exam-credentials', credentials);

    this.status = examStatus;
    this.exam = { test, students, results: parsedTestResults, id: null };
    this.credentials = credentials;
    this.socket = socket;
  }

  private handleResults(results: TempResults) {
    if (!this.exam) return;

    const testQuestionsResults = parseTempResultsIntoTestQuestionWithResults(
      this.exam.test,
      results,
    );

    this.exam.results = testQuestionsResults;
  }

  private handleExamFinished(detailedExam: DetailedExam) {
    if (!this.exam) return;

    storage.remove('author-exam-credentials');
    this.exam.id = detailedExam.id;
    this.status = 'finished';
  }
}

const authorExamStore = new AuthorExamStore();

export default authorExamStore;
