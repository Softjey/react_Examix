import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginGuard } from './guards/login.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Req() req) {
    const { user } = req;

    return {
      message: 'Login successful. Welcome!',
      user: this.usersService.normalize(user),
    };
  }
}
