import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TestsService } from './tests.service';
import { UseSessionGuard } from 'src/modules/auth/decorators/session-guard.decorator';
import { CreateTestDto } from './dtos/create-test.dto';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { GetTestsDto } from './dtos/get-tests.dto';

@Controller('tests')
@UseSessionGuard()
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  async create(@Body() createTestDto: CreateTestDto, @User('id') authorId) {
    const [test, questionsCount] = await this.testsService.create({ ...createTestDto, authorId });

    return {
      message: 'Test was created successfully',
      test: { ...test, questionsCount },
    };
  }

  @Get()
  getAll(@Query() query: GetTestsDto) {
    return this.testsService.getAll(query);
  }
}
