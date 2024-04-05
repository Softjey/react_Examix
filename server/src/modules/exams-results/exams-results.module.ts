import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ExamsResultsService } from './exams-results.service';

@Module({
  imports: [PrismaModule],
  providers: [ExamsResultsService],
  exports: [ExamsResultsService],
})
export class ExamsResultsModule {}
