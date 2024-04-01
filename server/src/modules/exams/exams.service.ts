import { Injectable } from '@nestjs/common';
import { Test } from '@prisma/client';
import { TestsService } from '../tests/tests.service';
import { ExamQuestion } from './entities/exam-question.entity';
import { Exam } from './entities/exam.entity';
import { Student } from './entities/student.entity';
import { UniqueIdService } from '../unique-id/unique-id.service';

@Injectable()
export class ExamsService {
  constructor(
    private readonly testsService: TestsService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async create(testId: Test['id']) {
    const [test, questions] = await this.testsService.getTestAndQuestionsByTestId(testId);
    const examsQuestions = questions.map((question) => new ExamQuestion(question));

    return new Exam(test, examsQuestions);
  }

  async addStudent(exam: Exam, name: Student['name'], clientId: Student['clientId']) {
    const id = this.uniqueIdService.generateUUID();
    const newStudent = new Student(id, clientId, name);

    exam.students.set(newStudent.id, newStudent);

    return newStudent;
  }
}
