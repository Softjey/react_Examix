export interface StudentExamCredentials {
  studentId: string;
  studentToken: string;
  examCode: string;
  studentName: string;
}

export interface AuthorExamCredentials {
  authorToken: string;
  examCode: string;
}

export interface PinCode {
  pinCode: string;
  isLocked: boolean;
}

type StorageMap = {
  'student-exam-credentials': StudentExamCredentials;
  'author-exam-credentials': AuthorExamCredentials;
  'pin-code': PinCode;
  theme: 'light' | 'dark';
};

export default StorageMap;
