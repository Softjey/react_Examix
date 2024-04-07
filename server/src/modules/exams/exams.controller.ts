import { Body, Controller, ForbiddenException, Get } from '@nestjs/common';
import { NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UseSessionGuard } from '../auth/decorators/session-guard.decorator';
import { CreateExamDto } from './dtos/create-exam.dto';
import { User } from '../auth/decorators/user.decorator';
import { ExamsService } from './services/exams.service';
import { ExamsHistoryService } from './services/exams-history.service';
import { User as UserModel } from '@prisma/client';
import { GetExamsResultsDto } from './dtos/get-exams-results.dto';

@Controller('exams')
@UseSessionGuard()
export class ExamsController {
  constructor(
    private readonly examsService: ExamsService,
    private readonly examsResultsService: ExamsHistoryService,
  ) {}

  @Post()
  async create(@Body() { testId }: CreateExamDto, @User('id') authorId) {
    const { examCode, authorToken } = await this.examsService.create(authorId, testId);

    return {
      message: 'Exam was created successfully',
      examCode,
      authorToken,
    };
  }

  @Get()
  getAll(@User() { id, role }: UserModel, @Query() query: GetExamsResultsDto) {
    if (role === 'ADMIN') {
      return this.examsResultsService.getAll(query);
    }

    if (query.authorId) {
      throw new ForbiddenException('Only admins can filter by userId');
    }

    return this.examsResultsService.getAll({ ...query, authorId: id });
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number, @User() user: UserModel) {
    const exam = await this.examsResultsService.getById(id);

    if (user.role !== 'ADMIN' && exam.authorId !== user.id) {
      throw new ForbiddenException('You are not allowed to see this exam');
    }

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    return exam;
  }
}
