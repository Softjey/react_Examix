import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { HashService } from 'src/modules/hash/hash.service';
import { UsersService } from 'src/modules/users/users.service';
import { MailService } from '../../mail/mail.service';
import { UniqueIdService } from '../../unique-id/unique-id.service';
import { AuthCacheService } from './auth-cache.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly mailService: MailService,
    private readonly uniqueIdService: UniqueIdService,
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  async validateUser(email: User['email'], password: User['password']): Promise<User | null> {
    const user = await this.usersService.getByEmail(email);

    console.log('user: ', user);

    if (!user) {
      return null;
    }

    const passwordIsCorrect = await this.hashService.compare(password, user.password);

    console.log('passwordIsCorrect: ', passwordIsCorrect);

    return passwordIsCorrect ? user : null;
  }

  async forgotPassword(email: User['email']) {
    const user = await this.usersService.getByEmail(email);
    const confirmToken = this.uniqueIdService.generateUUID();

    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    await this.authCacheService.setResetPasswordToken(confirmToken, user.id);
    await this.mailService.sendPasswordForgotEmail(user.name, email, confirmToken);
  }

  async resetPassword(token: string, password: User['password']) {
    const userId = await this.authCacheService.getResetPasswordToken(token);

    if (!userId) {
      throw new NotFoundException('Confirmation token is invalid or expired.');
    }

    await this.usersService.updatePassword(userId, password);
    await this.authCacheService.deleteResetPasswordToken(token);
  }
}
