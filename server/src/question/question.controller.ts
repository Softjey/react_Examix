import { Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getAll() {
    return this.questionService.getAll();
  }

  @Post()
  create() {
    return this.questionService.create({
      title: 'Some title',
      answers: [{ title: 'Wrong answer', isCorrect: false }],
    });
  }
}
