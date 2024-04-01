import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UniqueIdService } from 'src/modules/unique-id/unique-id.service';
import { UsersService } from 'src/modules/users/users.service';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    private readonly usersService: UsersService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async create(userId: User['id']) {
    const user = await this.usersService.getById(userId);
    const authorToken = this.uniqueIdService.generateUUID();

    return new Author(user, authorToken);
  }
}
