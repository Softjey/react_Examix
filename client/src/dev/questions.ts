export interface StudentAnswer {
  title: string;
}

export interface TestInfo {
  authorId: number;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  questionsAmount: number;
  subject: string;
}

export interface Question {
  id: number;
  index: number;
  answers: StudentAnswer[];
  type: QuestionType;
  title: string;
  maxScore: number;
  timeLimit: number;
}

export enum QuestionType {
  SINGLE_CHOICE,
  MULTIPLE_CHOICE,
}

export default [
  {
    id: 1,
    index: 1,
    answers: [{ title: 'JavaScript' }, { title: 'Java' }, { title: 'Python' }, { title: 'C#' }],
    type: QuestionType.SINGLE_CHOICE,
    title: 'Which of these is a scripting language primarily used for client-side web development?',
    maxScore: 10,
    timeLimit: 10,
  },
  {
    id: 2,
    index: 2,
    answers: [
      { title: 'function myFunction()' },
      { title: 'function:myFunction()' },
      { title: 'function = myFunction()' },
    ],
    type: QuestionType.SINGLE_CHOICE,
    title: 'How is a function declared in JavaScript?',
    maxScore: 10,
    timeLimit: 10,
  },
  {
    id: 3,
    index: 3,
    answers: [{ title: 'True' }, { title: 'False' }],
    type: QuestionType.SINGLE_CHOICE,
    title: "In JavaScript, the statement 'x == y' checks both value and type of x and y.",
    maxScore: 10,
    timeLimit: 10,
  },
  {
    id: 4,
    index: 4,
    answers: [{ title: 'null' }, { title: 'undefined' }, { title: '0' }, { title: "''" }],
    type: QuestionType.MULTIPLE_CHOICE,
    title: 'Which of the following are falsy values in JavaScript?',
    maxScore: 20,
    timeLimit: 10,
  },
  {
    id: 5,
    index: 5,
    answers: [{ title: 'Array' }, { title: 'Object' }, { title: 'Function' }, { title: 'String' }],
    type: QuestionType.MULTIPLE_CHOICE,
    title: 'In JavaScript, which of the following are considered first-class objects?',
    maxScore: 20,
    timeLimit: 10,
  },
  {
    id: 6,
    index: 6,
    answers: [{ title: 'let' }, { title: 'const' }, { title: 'var' }],
    type: QuestionType.MULTIPLE_CHOICE,
    title: 'Which of the following keywords can be used to define variables in JavaScript?',
    maxScore: 15,
    timeLimit: 10,
  },
  {
    id: 7,
    index: 7,
    answers: [
      { title: 'Document Object Model' },
      { title: 'Data Object Model' },
      { title: 'Display Object Management' },
    ],
    type: QuestionType.SINGLE_CHOICE,
    title: 'What does DOM stand for in the context of web development?',
    maxScore: 10,
    timeLimit: 10,
  },
  {
    id: 8,
    index: 8,
    answers: [
      { title: 'Synchronous JavaScript and XML' },
      { title: 'Simple JSON and XML' },
      { title: 'Synchronized JavaScript and XML' },
    ],
    type: QuestionType.SINGLE_CHOICE,
    title: 'What does AJAX stand for?',
    maxScore: 10,
    timeLimit: 10,
  },
  {
    id: 9,
    index: 9,
    answers: [
      { title: 'Callback' },
      { title: 'Promise' },
      { title: 'Async/Await' },
      { title: 'Event Loop' },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    title: 'Which of the following are methods for handling asynchronous operations in JavaScript?',
    maxScore: 20,
    timeLimit: 10,
  },
  {
    id: 10,
    index: 10,
    answers: [
      { title: 'Object-oriented programming' },
      { title: 'Functional programming' },
      { title: 'Procedural programming' },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    title: 'Which programming paradigms are supported by JavaScript?',
    maxScore: 20,
    timeLimit: 10,
  },
] as unknown as Question[];
