import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dtos/create-room.dto';
import { Room } from './interfaces/Room';
import { User } from '@prisma/client';
import { UniqueIdService } from '../unique-id/unique-id.service';

@Injectable()
export class RoomsService {
  private readonly rooms = new Map<string, Room>();

  constructor(private readonly uniqueIdService: UniqueIdService) {}

  generateRoomId() {
    let newRoomId;

    do {
      const digitRoomId = Math.floor(Math.random() * 100_000);

      newRoomId = `${digitRoomId}`.padStart(6, '0');
    } while (this.rooms.has(newRoomId));

    return newRoomId;
  }

  createRoom({ authorId, testId }: CreateRoomDto & { authorId: User['id'] }) {
    const roomId = this.generateRoomId();
    const authorToken = this.uniqueIdService.generate();

    this.rooms.set(roomId, {
      id: roomId,
      testId,
      authorId,
      authorToken,
    });

    return {
      roomId,
      authorToken,
    };
  }

  roomExist(roomId: string) {
    return this.rooms.has(roomId);
  }
}
