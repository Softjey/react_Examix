import { Module } from '@nestjs/common';
import { UniqueIdService } from './unique-id.service';

@Module({
  providers: [UniqueIdService],
  exports: [UniqueIdService],
})
export class UniqueIdModule {}
