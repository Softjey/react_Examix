import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dtos/create-room.dto';
import { User } from '@prisma/client';
import { UniqueIdService } from '../unique-id/unique-id.service';
import { ExamsService } from '../exams/exams.service';
import { Room } from './room.entity';
import { AuthorService } from '../authors/authors.service';
import { Author } from '../authors/author.entity';
import { Socket } from 'socket.io';
import { Student } from '../exams/entities/student.entity';

@Injectable()
export class RoomsService {
  private readonly rooms = new Map<Room['id'], Room>();

  constructor(
    private readonly authorService: AuthorService,
    private readonly examsService: ExamsService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async createRoom({ authorId, testId }: CreateRoomDto & { authorId: User['id'] }) {
    const roomId = this.uniqueIdService.generate6DigitCode(this.rooms);
    const examPromise = this.examsService.create(testId);
    const authorPromise = this.authorService.create(authorId);
    const [exam, author] = await Promise.all([examPromise, authorPromise]);
    const room = new Room(roomId, exam, author);

    this.rooms.set(roomId, room);

    return room;
  }

  private get(roomId: Room['id']) {
    const room = this.rooms.get(roomId);

    if (!room) {
      throw new Error('Room id is invalid');
    }

    return room;
  }

  async joinAuthor(roomId, clientId) {
    this.get(roomId).author.clientId = clientId;
  }

  async roomExist(roomId: string) {
    return this.rooms.has(roomId);
  }

  async isAuthorOfRoom(authorToken: Author['authorToken'], roomId: Room['id']) {
    return this.get(roomId).author.authorToken === authorToken;
  }

  async getRoomAuthorClientId(roomId: Room['id']) {
    return this.get(roomId).author.clientId;
  }

  async joinStudent(roomId: Room['id'], name: Student['name'], clientId: Socket['id']) {
    const exam = this.get(roomId).exam;
    const newStudent = await this.examsService.addStudent(exam, name, clientId);

    return newStudent;
  }

  async getTestInfo(roomId: Room['id']) {
    const { test, questions } = this.get(roomId).exam;

    return {
      test,
      questionsAmount: questions.length,
    };
  }
}
