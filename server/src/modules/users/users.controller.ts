import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UseSessionGuard } from 'src/modules/auth/decorators/session-guard.decorator';

@Controller('users')
@UseSessionGuard()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.usersService.getByEmail(body.email);

    if (user) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = await this.usersService.create(body);

    return {
      message: 'User created successfully',
      newUser: this.usersService.normalize(newUser),
    };
  }
}
