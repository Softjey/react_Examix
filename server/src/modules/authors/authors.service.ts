import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UniqueIdService } from 'src/modules/unique-id/unique-id.service';
import { UsersService } from 'src/modules/users/users.service';
import { Author } from './author.entity';
import { Redis } from 'ioredis';

@Injectable()
export class AuthorService {
  redisPrefix = 'author';

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisService: Redis,
    private readonly usersService: UsersService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async create(userId: User['id']) {
    const user = await this.usersService.getById(userId);
    const authorToken = this.uniqueIdService.generateUUID();

    return new Author(user, authorToken);
  }

  async save(id: string, author: Author) {
    await this.redisService.set(`${this.redisPrefix}:${id}`, JSON.stringify(author));
  }

  async restore(id: string) {
    const author = await this.redisService.get(`${this.redisPrefix}:${id}`);

    return author ? JSON.parse(author) : null;
  }
}
