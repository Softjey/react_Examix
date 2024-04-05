// eslint-disable-next-line max-len
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common'; // prettier-ignore
import { QuestionsService } from './questions.service';
import { UseSessionGuard } from '../auth/decorators/session-guard.decorator';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { User } from '../auth/decorators/user.decorator';
import { GetQuestionDto } from './dtos/get-questions-dto';
import { Question } from './interfaces/question.interface';

@UseSessionGuard()
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get()
  getAll(@Query() query: GetQuestionDto) {
    return this.questionService.getAll(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: Question['id']) {
    const question = await this.questionService.getOne(id);

    if (!question) {
      throw new NotFoundException(`Question with ${id} not found`);
    }

    return question;
  }

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto, @User('id') authorId) {
    return this.questionService.create({
      ...createQuestionDto,
      authorId,
    });
  }
}
