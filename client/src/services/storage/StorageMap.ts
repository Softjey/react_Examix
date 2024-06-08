export interface StudentExamCredentials {
  studentId: string;
  studentToken: string;
  examCode: string;
  studentName: string;
}

type StorageMap = {
  'student-exam-credentials': StudentExamCredentials;
};

export default StorageMap;
