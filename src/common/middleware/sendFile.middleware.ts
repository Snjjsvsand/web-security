import { Injectable, NestMiddleware } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class SendFileMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('MIDDLEWARE')
    res.sendFile(join(__dirname, '../../../' , 'public/index.html'))
  }
}
