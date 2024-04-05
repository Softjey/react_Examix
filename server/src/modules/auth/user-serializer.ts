import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { SessionUserDto } from './dto/session-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: any, sessionUser?: SessionUserDto) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(sessionUser: SessionUserDto, done: (err: any, user?: User) => void) {
    const user = await this.usersService.getById(sessionUser.id);

    return user ? done(null, user) : done(null);
  }
}
