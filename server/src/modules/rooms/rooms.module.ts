import { Module } from '@nestjs/common';
import { RoomsGateway } from './rooms.gateway';
import { RoomsService } from './rooms.service';
import { UniqueIdModule } from '../unique-id/unique-id.module';
import { RoomsController } from './rooms.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [UniqueIdModule, PrismaModule, StudentsModule],
  providers: [RoomsGateway, RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
