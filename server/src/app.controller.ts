import { All, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @All()
  root() {
    return { message: 'Hello World!' };
  }
}
