import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SesscionMiddlware } from '../session/session.middleware'
import { CorsController } from './cors.controller';
import { CorsService } from './cors.service';

@Module({
  imports: [],
  controllers: [CorsController],
  providers: [CorsService],
})

export class CorsModule implements NestModule{ 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SesscionMiddlware).forRoutes({
      path:'cors/*',
      method:RequestMethod.ALL
    })
  }
}
