import { EventEmitter } from 'stream';
import { Exam } from '../entities/exam.entity';
import { Student } from '../entities/student.entity';
import config from 'src/config';

interface ExamEventEmitter {
  on(event: 'exam-start', listener: () => void): this;
  on(event: 'question', listener: () => void): this;

  emit(event: 'exam-start'): boolean;
  emit(event: 'question'): boolean;
}

interface PreparedQuestion {
  title: string;
  answers: { title: string }[];
  maxScore: number;
  timeLimit: number;
}

interface WrongQuestionIndexDetails {
  studentId: Student['id'];
  questionIndex: number;
  correctQuestionIndex: number;
}

export class ExamEmitter extends EventEmitter implements ExamEventEmitter {
  currentQuestion = 0;
  preparedQuestions: PreparedQuestion[];

  constructor(private readonly exam: Exam) {
    super();
    this.preparedQuestions = this.prepareQuestions(exam.questions);

    this.once('exam-start', () => {
      this.nextQuestion(this.preparedQuestions[this.currentQuestion]);
    });

    this.on('question', (question: PreparedQuestion) => {
      const timeLimit = (question.timeLimit + config.NETWORK_DELAY_BUFFER) * 1000;

      setTimeout(() => {
        this.currentQuestion += 1;

        if (this.currentQuestion >= this.preparedQuestions.length) {
          return this.endExam();
        }

        this.nextQuestion(this.preparedQuestions[this.currentQuestion]);
      }, timeLimit);

      this.on('answer', (studentId: Student['id'], questionIndex: number, answerIndex: number) => {
        if (questionIndex !== this.currentQuestion) {
          return this.wrongQuestionIndex({
            studentId,
            questionIndex,
            correctQuestionIndex: this.currentQuestion,
          });
        }

        const answers = this.exam.questions[this.currentQuestion].answers;

        this.exam.questions[this.currentQuestion].studentsResults.set(studentId, {
          answer: answers[answerIndex].title,
        });
      });
    });
  }

  private prepareQuestions(question: Exam['questions']) {
    return question.map(({ title, answers, maxScore, timeLimit }) => ({
      title,
      answers: answers.map(({ title }) => ({ title })),
      maxScore,
      timeLimit,
    }));
  }

  private nextQuestion(question: PreparedQuestion) {
    this.emit('question', question);

    return new Promise((resolve) => {
      const timeLimit = (question.timeLimit + config.NETWORK_DELAY_BUFFER) * 1000;
      setTimeout(() => resolve(true), timeLimit);
    });
  }

  startExam() {
    this.emit('exam-start');
  }

  private endExam() {
    this.emit('exam-end', this.exam);
  }

  private wrongQuestionIndex(details: WrongQuestionIndexDetails) {
    this.emit('wrong-question-index', details);
  }

  answerQuestion(studentId: Student['id'], questionIndex: number, answerIndex: number) {
    this.emit('answer', studentId, questionIndex, answerIndex);
  }
}
