import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { SessionGuard } from 'src/auth/guards/session.guard';

export function UseSessionGuard() {
  return applyDecorators(UseGuards(SessionGuard), ApiCookieAuth('connect.sid'));
}
