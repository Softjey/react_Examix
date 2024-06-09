import { ExamQuestion } from 'src/modules/exams/entities/exam-question.entity';
import { Student } from 'src/modules/exams/entities/student.entity';

type ResultsStudent = Pick<Student, 'name' | 'results'> & {
  studentId: string;
};

export interface TempResults {
  students: ResultsStudent[];
  questions: ExamQuestion[];
}
