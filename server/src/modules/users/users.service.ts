import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashService } from 'src/modules/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  normalize({ id, email, createdAt, name, role, photo }: User) {
    return { id, name, email, role, createdAt, photo };
  }

  getByEmail(email: User['email']) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  getById(id: User['id']) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async create(createUserDto: CreateUserDto) {
    const encryptedPassword = await this.hashService.hash(createUserDto.password);

    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: encryptedPassword,
      },
    });
  }

  async updatePassword(id: User['id'], newPassword: User['password']) {
    const encryptedPassword = await this.hashService.hash(newPassword);

    return this.prismaService.user.update({
      where: { id },
      data: { password: encryptedPassword },
    });
  }

  async update(id: User['id'], newUser: Partial<User>) {
    return this.prismaService.user.update({
      where: { id },
      data: newUser,
    });
  }
}
