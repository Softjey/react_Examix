import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { SessionGuard } from 'src/modules/auth/guards/session.guard';

export function UseSessionGuard() {
  return applyDecorators(UseGuards(SessionGuard), ApiCookieAuth('connect.sid'));
}
