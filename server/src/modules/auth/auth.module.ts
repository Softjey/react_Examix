import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { HashModule } from 'src/modules/hash/hash.module';
import { LocalStrategy } from './strategies/local.strategy';
import { UserSerializer } from './user-serializer';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from '../mail/mail.module';
import { RedisModule } from '../redis/redis.module';
import { AuthCacheService } from './services/auth-cache.service';
import { UniqueIdModule } from '../unique-id/unique-id.module';

@Module({
  imports: [
    UsersModule,
    HashModule,
    PassportModule.register({ session: true }),
    MailModule,
    RedisModule,
    UniqueIdModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, UserSerializer, AuthCacheService],
})
export class AuthModule {}
