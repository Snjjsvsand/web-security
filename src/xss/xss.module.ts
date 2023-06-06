import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { XssController } from './xss.controller'
import { SendFileMiddleware } from '../common/middleware/sendFile.middleware'
import { XssService } from './xss.service';

@Module({
  imports: [],
  controllers: [XssController],
  providers: [XssService],
})

export class XssModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SendFileMiddleware).forRoutes({
      path:'xss/index',
      method:RequestMethod.GET
    })
  }
}
