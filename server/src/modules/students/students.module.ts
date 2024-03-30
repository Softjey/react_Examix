import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
