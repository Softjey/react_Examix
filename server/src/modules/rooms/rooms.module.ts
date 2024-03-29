import { Module } from '@nestjs/common';
import { RoomsGateway } from './rooms.gateway';
import { RoomsService } from './rooms.service';
import { UniqueIdModule } from '../unique-id/unique-id.module';
import { RoomsController } from './rooms.controller';

@Module({
  imports: [UniqueIdModule],
  providers: [RoomsGateway, RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
