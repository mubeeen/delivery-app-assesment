import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Delivery Order Price Calculator service (DOPC)';
  }
}
