import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { HashService } from 'src/hash/hash.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(
    email: User['email'],
    password: User['password'],
  ): Promise<User | null> {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      return null;
    }

    const passwordIsCorrect = await this.hashService.compare(
      password,
      user.password,
    );

    return passwordIsCorrect ? user : null;
  }
}
