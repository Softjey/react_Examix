import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UseSessionGuard } from 'src/auth/decorators/session-guard.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseSessionGuard()
  create(@Body(new ValidationPipe()) body: CreateUserDto) {
    this.usersService.create(body);
  }
}
