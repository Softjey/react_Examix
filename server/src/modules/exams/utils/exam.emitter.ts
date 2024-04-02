import { EventEmitter } from 'stream';
import { Exam } from '../entities/exam.entity';
import { Student } from '../entities/student.entity';
import config from 'src/config';
import { ExamEmitterException, ExceptionDetails, ExceptionType } from './exam-emitter.exception';
import { ExamQuestion } from '../entities/exam-question.entity';

export interface PreparedQuestion {
  id: number;
  type: ExamQuestion['type'];
  title: string;
  answers: { title: string }[];
  maxScore: number;
  timeLimit: number;
}

interface ExamEmitterI {
  startExam(): void;
  answerQuestion(studentId: Student['id'], questionIndex: number, answerIndexes: number[]): void;
  onQuestion(callback: (question: PreparedQuestion) => void): void;
  onException(callback: (exception: ExamEmitterException) => void): void;
  onExamEnd(callback: (exam: Exam) => void): void;
}

export class ExamEmitter extends EventEmitter implements ExamEmitterI {
  #status: 'created' | 'started' | 'ended' = 'created';
  private currentQuestion = 0;
  private preparedQuestions: PreparedQuestion[];

  constructor(public readonly exam: Exam) {
    super();
    this.preparedQuestions = this.prepareQuestions(exam.questions);
    this.onQuestion(this.questionHandler);
  }

  private prepareQuestions(question: Exam['questions']): PreparedQuestion[] {
    return question.map((question, id) => {
      const answers = question.answers.map(({ title }) => ({ title }));

      return { ...question, id, answers };
    });
  }

  private emitQuestion(question: PreparedQuestion) {
    this.emit('question', question);
  }

  private emitEndExam() {
    this.emit('exam-end', this.exam);
  }

  private emitException(exceptionType: ExceptionType, details?: ExceptionDetails) {
    this.emit('exception', new ExamEmitterException(exceptionType, details));
  }

  private answerHandler(studentId: Student['id'], questionIndex: number, answersIndexes: number[]) {
    if (questionIndex !== this.currentQuestion) {
      return this.emitException('wrong-question-index', {
        studentId,
        questionIndex,
        currentQuestionIndex: this.currentQuestion,
      });
    }

    const answers = this.exam.questions[this.currentQuestion].answers;

    this.exam.students[studentId].results[this.currentQuestion] = {
      answers: answersIndexes.map((answerIndex) => answers[answerIndex].title),
    };
  }

  private questionHandler(question: PreparedQuestion) {
    const timeLimit = (question.timeLimit + config.NETWORK_DELAY_BUFFER) * 1000;

    setTimeout(() => {
      this.currentQuestion += 1;

      if (this.currentQuestion >= this.preparedQuestions.length) {
        return this.emitEndExam();
      }

      this.emitQuestion(this.preparedQuestions[this.currentQuestion]);
    }, timeLimit);

    this.on('answer', this.answerHandler);
  }

  get status() {
    return this.#status;
  }

  startExam() {
    if (this.#status !== 'started') {
      this.emitException('exam-already-started');
    }

    this.#status = 'started';
    this.emit('exam-start');

    setTimeout(() => {
      this.emitQuestion(this.preparedQuestions[this.currentQuestion]);
    }, config.NETWORK_DELAY_BUFFER * 1000);
  }

  answerQuestion(studentId: Student['id'], questionIndex: number, answerIndexes: number[]) {
    if (this.#status === 'created') {
      return this.emitException('exam-not-started');
    }

    if (this.#status === 'ended') {
      return this.emitException('exam-already-ended');
    }

    this.emit('answer', studentId, questionIndex, answerIndexes);
  }

  onException(callback: (exception: ExamEmitterException) => void) {
    this.on('exception', callback);
  }

  onQuestion(callback: (question: PreparedQuestion) => void) {
    this.on('question', callback);
  }

  onExamEnd(callback: (exam: Exam) => void) {
    this.on('exam-end', callback);
  }
}
