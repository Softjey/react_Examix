import { Body, Controller, Post } from '@nestjs/common';
import { UseSessionGuard } from '../auth/decorators/session-guard.decorator';
import { CreateRoomDto } from './dtos/create-room.dto';
import { User } from '../auth/decorators/user.decorator';
import { ExamsService } from './exams.service';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @UseSessionGuard()
  async create(@Body() { testId }: CreateRoomDto, @User('id') authorId) {
    const { examCode, authorToken } = await this.examsService.create(authorId, testId);

    return {
      message: 'Room was created successfully',
      examCode,
      authorToken,
    };
  }
}
