import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { UseSessionGuard } from '../auth/decorators/session-guard.decorator';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { User } from '../auth/decorators/user.decorator';

@Controller('questions')
@UseSessionGuard()
export class QuestionController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  getAll() {
    return this.questionService.getAll();
  }

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto, @User('id') authorId) {
    return this.questionService.create({
      ...createQuestionDto,
      authorId,
    });
  }
}
