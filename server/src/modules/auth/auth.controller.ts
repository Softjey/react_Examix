import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { LoginGuard } from './guards/login.guard';
import { User } from './decorators/user.decorator';
import { User as UserI } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @UseGuards(LoginGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDto })
  async login(@User() user: UserI) {
    return {
      message: 'Login successful. Welcome!',
      user: this.usersService.normalize(user),
    };
  }
}
