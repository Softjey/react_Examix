import { ExamQuestion } from 'src/modules/exams/entities/exam-question.entity';
import { Student } from 'src/modules/exams/entities/student.entity';

export interface TempResults {
  results: { name: Student['name']; results: Student['results'] }[];
  questions: ExamQuestion[];
}
