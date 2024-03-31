import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class ServerExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === 'P2003') {
        const fieldName = exception.meta.field_name;
        const message = `Foreign key ${fieldName} doesn't exist`;

        return super.catch(new BadRequestException(message), host);
      }
    }
  }
}
