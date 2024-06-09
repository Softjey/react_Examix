import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordForgotEmail({ email, token, name, redirectUrl }: ForgotPasswordDto) {
    const redirectURL = new URL(redirectUrl);
    const searchParamsExist = redirectURL.searchParams.size > 0;
    const confirmUrl = `${redirectUrl}${searchParamsExist ? '&' : '?'}token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Password reset',
      template: './forgot-password',
      context: { name, confirmUrl },
    });
  }
}
