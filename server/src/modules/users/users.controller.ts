import { BadRequestException, Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UseSessionGuard } from 'src/modules/auth/decorators/session-guard.decorator';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ApiOperation } from '@nestjs/swagger';
import { User } from '../auth/decorators/user.decorator';
import { User as IUser } from '@prisma/client';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
@UseSessionGuard()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ description: 'This operation can only be performed by admins.' })
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

  @Patch('me')
  async updateMe(@User() user: IUser, @Body() userDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(user.id, userDto);

    return {
      message: 'User updated successfully',
      user: this.usersService.normalize(updatedUser),
    };
  }
}
