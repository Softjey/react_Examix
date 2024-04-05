// eslint-disable-next-line max-len
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common'; // prettier-ignore
import { QuestionsService } from './questions.service';
import { UseSessionGuard } from '../auth/decorators/session-guard.decorator';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { User } from '../auth/decorators/user.decorator';
import { GetQuestionDto } from './dtos/get-questions.dto';
import { Question } from './interfaces/question.interface';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

@UseSessionGuard()
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionsService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto, @User('id') authorId) {
    const question = await this.questionService.create({
      ...createQuestionDto,
      authorId,
    });

    return {
      message: 'Question was created successfully',
      question,
    };
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return a list of questions' })
  getAll(@Query() query: GetQuestionDto) {
    return this.questionService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async getOne(@Param('id', ParseIntPipe) id: Question['id']) {
    const question = await this.questionService.getOne(id);

    if (!question) {
      throw new NotFoundException(`Question with ${id} not found`);
    }

    return question;
  }
}
