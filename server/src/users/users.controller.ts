import { Controller, Post, UseGuards } from '@nestjs/common';
import { SessionGuard } from 'src/auth/guards/session.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(SessionGuard)
  create() {
    this.usersService.create({
      email: 'example@gmail.com',
      password: 'password',
      name: 'John Doe',
    });
  }
}
