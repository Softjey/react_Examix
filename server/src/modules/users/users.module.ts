import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { HashModule } from 'src/modules/hash/hash.module';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule, HashModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
