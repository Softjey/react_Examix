import { Body, Controller, Get, NotFoundException } from '@nestjs/common';
import { Param, ParseArrayPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { UseSessionGuard } from '../auth/decorators/session-guard.decorator';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { User } from '../auth/decorators/user.decorator';
import { GetQuestionDto } from './dtos/get-questions.dto';
import { Question } from './interfaces/question.interface';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

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

  @ApiBody({ type: [CreateQuestionDto] })
  @Post('many')
  async createMany(
    @User('id') authorId,
    @Body(
      new ParseArrayPipe({ items: CreateQuestionDto, whitelist: true, forbidNonWhitelisted: true }),
    )
    createQuestionDto: CreateQuestionDto[],
  ) {
    const questionsCount = await this.questionService.createMany(
      createQuestionDto.map((question) => ({ ...question, authorId })),
    );

    return {
      message: 'Questions were created successfully',
      questionsCount,
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
