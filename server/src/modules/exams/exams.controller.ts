import { Body, Controller, ForbiddenException, Get } from '@nestjs/common';
import { NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UseSessionGuard } from '../auth/decorators/session-guard.decorator';
import { CreateExamDto } from './dtos/create-exam.dto';
import { User } from '../auth/decorators/user.decorator';
import { ExamsHistoryService } from './services/exams-history.service';
import { User as UserModel } from '@prisma/client';
import { GetExamsResultsDto } from './dtos/get-exams-results.dto';
import { ExamsInitService } from './services/exams-init.service';

@Controller('exams')
@UseSessionGuard()
export class ExamsController {
  constructor(
    private readonly examsInitService: ExamsInitService,
    private readonly examsHistoryService: ExamsHistoryService,
  ) {}

  @Post()
  async create(@Body() { testId }: CreateExamDto, @User('id') authorId) {
    const { examCode, authorToken } = await this.examsInitService.createAndInit(authorId, testId);

    return {
      message: 'Exam was created successfully',
      examCode,
      authorToken,
    };
  }

  @Get()
  getAll(@User() { id, role }: UserModel, @Query() query: GetExamsResultsDto) {
    if (role === 'ADMIN') {
      return this.examsHistoryService.getAll(query);
    }

    if (query.authorId) {
      throw new ForbiddenException('Only admins can filter by userId');
    }

    return this.examsHistoryService.getAll({ ...query, authorId: id });
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number, @User() user: UserModel) {
    const exam = await this.examsHistoryService.getById(id);

    if (user.role !== 'ADMIN' && exam?.authorId !== user.id) {
      throw new ForbiddenException('You are not allowed to see this exam');
    }

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    return exam;
  }
}
