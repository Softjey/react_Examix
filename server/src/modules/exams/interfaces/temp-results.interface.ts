import { ExamQuestion } from 'src/modules/exams/entities/exam-question.entity';
import { Student } from 'src/modules/exams/entities/student.entity';

export interface TempResults {
  students: Student[];
  questions: ExamQuestion[];
}
