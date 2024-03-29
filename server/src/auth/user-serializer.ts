import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { SessionUserDto } from './dto/session-user.dto';

@Injectable()
export class UserSerializer extends PassportSerializer {
  serializeUser(user: User, done: (err: any, sessionUser?: SessionUserDto) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser() {}
}
