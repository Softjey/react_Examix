import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashModule } from 'src/hash/hash.module';
import { LocalStrategy } from './strategies/local.strategy';
import { UserSerializer } from './user-serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, HashModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UserSerializer],
})
export class AuthModule {}
