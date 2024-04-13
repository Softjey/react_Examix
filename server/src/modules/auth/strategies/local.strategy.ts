import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: User['email'], password: User['password']) {
    const user = await this.authService.validateUser(email, password);

    console.log('user: localStrategy ', user);

    if (!user) {
      throw new UnauthorizedException('Authentication credentials are not valid.');
    }

    return user;
  }
}
