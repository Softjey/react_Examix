import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { SessionUserDto } from './dto/session-user.dto';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: any, sessionUser?: SessionUserDto) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser() {}
}
