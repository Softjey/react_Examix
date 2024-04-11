import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import config from 'src/config';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordForgotEmail(name: User['name'], email: User['email'], token: string) {
    const confirmUrl = `${config.CLIENT_URL}/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Password reset',
      template: './forgot-password',
      context: { name, confirmUrl },
    });
  }
}
