import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UseSessionGuard } from '../auth/decorators/session-guard.decorator';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dtos/create-room.dto';
import { User } from '../auth/decorators/user.decorator';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @UseSessionGuard()
  create(@Body(new ValidationPipe()) createRoomDto: CreateRoomDto, @User('id') authorId) {
    const { roomId, authorToken } = this.roomsService.createRoom({
      ...createRoomDto,
      authorId,
    });

    return {
      message: 'Room was created successfully',
      roomId,
      authorToken,
    };
  }
}
