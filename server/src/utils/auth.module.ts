import { Module } from '@nestjs/common';
import { AuthController } from '../modules/auth/auth.controller';
import { AuthService } from '../modules/auth/auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { HashModule } from 'src/modules/hash/hash.module';
import { LocalStrategy } from '../modules/auth/strategies/local.strategy';
import { UserSerializer } from '../modules/auth/user-serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, HashModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UserSerializer],
})
export class AuthModule {}
