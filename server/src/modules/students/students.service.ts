import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Room, Student } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ name, roomId }: { name: Student['name']; roomId: Room['id'] }) {
    return this.prismaService.student.create({ data: { name, roomId } });
  }

  getRoomStudents(roomId: Room['id']) {
    return this.prismaService.student.findMany({ where: { roomId } });
  }
}
