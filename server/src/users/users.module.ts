import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { HashModule } from 'src/hash/hash.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, HashModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
