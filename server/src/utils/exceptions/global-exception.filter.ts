/* eslint-disable max-len */
import { ArgumentsHost, BadRequestException, Catch, UnauthorizedException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request } from 'express';
import { DeserializingException } from 'src/modules/auth/exceptions/deserializing.exception';

@Catch(PrismaClientKnownRequestError, DeserializingException)
export class GlobalExceptionFilter extends BaseExceptionFilter {
  private host: ArgumentsHost;

  catch(exception: Error, host: ArgumentsHost) {
    this.host = host;

    if (exception instanceof PrismaClientKnownRequestError) {
      return this.catchPrismaExceptions(exception);
    }

    if (exception instanceof DeserializingException) {
      return this.catchDeserializationException();
    }
  }

  private catchDeserializationException() {
    const request = this.host.switchToHttp().getRequest<Request>();

    request.session.destroy((err) => {
      if (err) {
        return super.catch(err, this.host);
      }

      return super.catch(new UnauthorizedException('User was deleted or email or password was changed. Please, log in again.'), this.host); // prettier-ignore
    });
  }

  private catchPrismaExceptions(exception: PrismaClientKnownRequestError) {
    if (exception.code === 'P2003') {
      const fieldName = exception.meta.field_name;
      const message = `Foreign key ${fieldName} doesn't exist`;

      return super.catch(new BadRequestException(message), this.host);
    }
  }
}
