import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { LoginDto } from '../dto/login.dto';
import { validate } from 'class-validator';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { body } = request;
    const loginDto = plainToClass(LoginDto, body);

    const errors = await validate(loginDto);

    if (errors.length > 0) {
      const messages = errors.map(({ constraints }) => Object.values(constraints)).flat();
      throw new BadRequestException(messages);
    }

    const canActivateResult = (await super.canActivate(context)) as boolean;
    await super.logIn(request);

    return canActivateResult;
  }
}
