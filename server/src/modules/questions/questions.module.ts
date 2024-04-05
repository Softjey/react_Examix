import { Module } from '@nestjs/common';
import { QuestionController } from './questions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { QuestionsService } from './questions.service';

@Module({
  imports: [PrismaModule],
  controllers: [QuestionController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
