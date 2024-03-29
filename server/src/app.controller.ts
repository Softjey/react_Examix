import { All, Controller, UseGuards } from '@nestjs/common';
import { SessionGuard } from './auth/guards/session.guard';

@Controller()
export class AppController {
  @All()
  root() {
    return { message: 'Hello World!' };
  }

  @All('protected')
  @UseGuards(SessionGuard)
  protected() {
    return { message: 'You see protected route' };
  }
}
