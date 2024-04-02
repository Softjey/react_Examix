import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dtos/create-room.dto';
import { User } from '@prisma/client';
import { UniqueIdService } from '../unique-id/unique-id.service';
import { ExamsService } from '../exams/exams.service';
import { Room } from './room.entity';
import { AuthorService } from '../authors/authors.service';
import { Author } from '../authors/author.entity';
import { Socket } from 'socket.io';
import { Student } from '../exams/entities/student.entity';
import { Redis } from 'ioredis';

@Injectable()
export class RoomsService {
  private readonly rooms = new Map<Room['id'], Room>();

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisService: Redis,
    private readonly authorService: AuthorService,
    private readonly examsService: ExamsService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async saveExam(roomId: Room['id']) {
    const room = this.rooms.get(roomId);

    await this.examsService.save(roomId, room.examEmitter.exam);
  }

  async saveAuthor(roomId: Room['id']) {
    const room = this.rooms.get(roomId);

    await this.authorService.save(roomId, room.author);
  }

  async restore(roomId: Room['id']) {
    const exam = await this.examsService.restore(roomId);
    const author = await this.authorService.restore(roomId);

    return [exam, author];
  }

  async createRoom({ authorId, testId }: CreateRoomDto & { authorId: User['id'] }) {
    const roomId = this.uniqueIdService.generate6DigitCode(this.rooms);
    const examEmitterPromise = this.examsService.createEmitter(testId);
    const authorPromise = this.authorService.create(authorId);
    const [examEmitter, author] = await Promise.all([examEmitterPromise, authorPromise]);
    const room = new Room(roomId, examEmitter, author);

    room.examEmitter.onQuestion(() => this.saveExam(roomId));
    room.examEmitter.onExamEnd(() => this.saveExam(roomId));
    this.rooms.set(roomId, room);
    this.saveAuthor(roomId);

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
    const exam = this.get(roomId).examEmitter.exam;
    const newStudent = await this.examsService.addStudent(exam, name, clientId);

    return newStudent;
  }

  async getTestInfo(roomId: Room['id']) {
    const { test, questions } = this.get(roomId).examEmitter.exam;

    return {
      test,
      questionsAmount: questions.length,
    };
  }

  async getStudentClientId(roomId: Room['id'], studentId: Student['id']) {
    const student = this.get(roomId).examEmitter.exam.students[studentId];

    if (!student) {
      throw new Error('Student id is invalid');
    }

    return student.clientId;
  }

  async getExamEmitter(roomId: Room['id']) {
    return this.get(roomId).examEmitter;
  }

  getStudentId(clientId: Socket['id'], roomId: Room['id']) {
    const students = this.get(roomId).examEmitter.exam.students;
    const student = Object.values(students).find((student) => student.clientId === clientId);

    if (!student) {
      throw new Error('Student id is invalid');
    }

    return student.id;
  }
}
