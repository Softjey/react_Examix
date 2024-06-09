export interface StudentAuth {
  role: 'student';
  examCode: string;
  studentName: string;
  studentToken?: string;
  studentId?: string;
}

export interface AuthorAuth {
  role: 'author';
  examCode: string;
  authorToken: string;
}
