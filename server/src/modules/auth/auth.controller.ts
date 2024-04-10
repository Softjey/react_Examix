import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { HttpCode, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { LoginGuard } from './guards/login.guard';
import { User } from './decorators/user.decorator';
import { User as UserI } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';
import { UseSessionGuard } from './decorators/session-guard.decorator';
import { Request } from 'express';

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

  @Get()
  @UseSessionGuard()
  async auth(@User() user: UserI) {
    return {
      message: 'You are authenticated!',
      user: this.usersService.normalize(user),
    };
  }

  @Get('logout')
  @UseSessionGuard()
  async logout(@Req() request: Request) {
    request.logout((error: Error) => {
      if (error) {
        throw new InternalServerErrorException('Failed to logout. Please try again.');
      }
    });

    return {
      message: 'Logout successful. Goodbye!',
    };
  }
}
