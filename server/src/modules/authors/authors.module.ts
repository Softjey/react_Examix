import { Module } from '@nestjs/common';
import { AuthorService as AuthorsService } from './authors.service';
import { UsersModule } from 'src/modules/users/users.module';
import { UniqueIdModule } from 'src/modules/unique-id/unique-id.module';

@Module({
  imports: [UsersModule, UniqueIdModule],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
