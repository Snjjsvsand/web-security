import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XssModule } from './xss/xss.module';
import { CorsModule } from './cors/cors.module' 

@Module({
  imports: [XssModule , CorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
