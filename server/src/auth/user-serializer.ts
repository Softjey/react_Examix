import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: any, sessionUser?: { id: User['id'] }) => void,
  ) {
    console.log('User was serialized');
    done(null, { id: user.id });
  }

  async deserializeUser(
    sessionUser: { id: User['id'] },
    done: (err: any, user?: User) => void,
  ) {
    const user = await this.usersService.getById(sessionUser.id);

    if (!user) {
      console.log('User was un serialized 0');
      done(null);
      return;
    }

    console.log('User was un serialized 1');
    done(null, user);
  }
}
