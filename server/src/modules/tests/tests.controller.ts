// eslint-disable-next-line max-len
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common'; // prettier-ignore
import { TestsService } from './tests.service';
import { UseSessionGuard } from 'src/modules/auth/decorators/session-guard.decorator';
import { CreateTestDto } from './dtos/create-test.dto';
import { User } from 'src/modules/auth/decorators/user.decorator';
import { GetTestsDto } from './dtos/get-tests.dto';
import { ApiParam } from '@nestjs/swagger';

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

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const test = await this.testsService.getOne(id);

    if (!test) {
      throw new NotFoundException('Test not found. Check the ID and try again');
    }

    return test;
  }
}
