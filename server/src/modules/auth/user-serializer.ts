import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { SessionUserDto } from './dto/session-user.dto';
import { UsersService } from '../users/users.service';
import { DeserializingException } from './exceptions/deserializing.exception';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: any, sessionUser?: SessionUserDto) => void) {
    const { id, email, password } = user;

    done(null, { id, email, password });
  }

  async deserializeUser(sessionUser: SessionUserDto, done: (err: any, user?: User) => void) {
    const user = await this.usersService.getById(sessionUser.id);
    const userExists = !!user;
    const emailMatches = user?.email === sessionUser.email;
    const passwordMatches = user?.password === sessionUser.password;

    if (!userExists || !emailMatches || !passwordMatches) {
      return done(new DeserializingException());
    }

    done(null, user);
  }
}
