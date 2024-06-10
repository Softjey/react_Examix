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

type StorageMap = {
  'student-exam-credentials': StudentExamCredentials;
  'author-exam-credentials': AuthorExamCredentials;
  theme: 'light' | 'dark';
};

export default StorageMap;
