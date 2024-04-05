import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Exam } from '../exams/entities/exam.entity';

@Injectable()
export class ExamsResultsService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveExam({ author, students, test, questions }: Exam) {
    const questionIds = questions.map(({ id }) => id);
    const studentsArray = Object.values(students);
    const results = studentsArray.reduce((result, { name, results }) => {
      return result.concat(
        questionIds.map((questionId) => ({
          studentName: name,
          testQuestionId: questionId,
          studentAnswer: results[questionId] ? results[questionId] : null,
        })),
      );
    }, []);

    await this.prismaService.exam.create({
      data: {
        authorId: author.userId,
        testId: test.id,
        results: { createMany: { data: results } },
      },
    });
  }

  async parseResults(exam: Exam) {
    return {
      results: Object.values(exam.students),
      questions: exam.questions.slice(0, exam.currentQuestionIndex + 1),
    };
  }
}
