import { Body, Controller, Post } from '@nestjs/common';
import { TestsService } from './tests.service';
import { UseSessionGuard } from 'src/modules/auth/decorators/session-guard.decorator';
import { CreateTestDto } from './dtos/create-test.dto';
import { User } from 'src/modules/auth/decorators/user.decorator';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  @UseSessionGuard()
  async create(@Body() createTestDto: CreateTestDto, @User('id') authorId) {
    const [test, questionsCount] = await this.testsService.create({ ...createTestDto, authorId });

    return {
      message: 'Test was created successfully',
      test: { ...test, questionsCount },
    };
  }
}
