import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    const { user } = req;

    console.log(user);

    return {
      message: 'Succc',
      user,
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('hello')
  async hello() {
    return 'Hello world';
  }

  @Post('create')
  async createUser() {
    return this.usersService.create({
      email: 'example@email.com',
      name: 'some name',
      password: '1234567890',
    });
  }
}
