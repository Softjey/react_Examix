import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dtos/create-room.dto';
import { Room, Student, User } from '@prisma/client';
import { UniqueIdService } from '../unique-id/unique-id.service';
import { PrismaService } from '../prisma/prisma.service';
import { StudentsService } from '../students/students.service';
import { Socket } from 'socket.io';

@Injectable()
export class RoomsService {
  private authorsClientIds = new Map<Room['id'], Socket['id']>();

  constructor(
    private readonly uniqueIdService: UniqueIdService,
    private readonly prismaService: PrismaService,
    private readonly studentsService: StudentsService,
  ) {}

  generateRoomId() {
    let newRoomId;

    do {
      newRoomId = `${Math.floor(Math.random() * 100_000)}`.padStart(6, '0');
    } while (this.authorsClientIds.has(newRoomId));

    return newRoomId;
  }

  async createRoom({ authorId, testId }: CreateRoomDto & { authorId: User['id'] }) {
    // development only
    await this.prismaService.test.upsert({
      where: { id: testId },
      create: { id: testId, authorId, name: 'Test name', description: 'Test description' },
      update: {},
    });

    const room = await this.prismaService.room.create({
      data: {
        id: this.generateRoomId(),
        authorToken: this.uniqueIdService.generate(),
        authorId,
        testId,
      },
    });

    return room;
  }

  roomExist(roomId: string) {
    return this.prismaService.room.findUnique({ where: { id: roomId } });
  }

  async isAuthorOfRoom(authorToken: Room['authorToken'], roomId: Room['id']) {
    const room = await this.prismaService.room.findUnique({ where: { id: roomId, authorToken } });

    return room !== null;
  }

  async getRoomAuthor(roomId: Room['id']) {
    return this.authorsClientIds.get(roomId);
  }

  async joinAuthor(roomId, clientId) {
    this.authorsClientIds.set(roomId, clientId);
  }

  async joinStudent(roomId: Room['id'], studentName: Student['name']) {
    const [newStudent, allStudents] = await this.prismaService.$transaction([
      this.studentsService.create({ name: studentName, roomId }),
      this.studentsService.getRoomStudents(roomId),
    ]);

    return [
      { id: newStudent.id, name: newStudent.name },
      allStudents.map(({ id, name }) => ({ id, name })),
    ] as const;
  }
}
