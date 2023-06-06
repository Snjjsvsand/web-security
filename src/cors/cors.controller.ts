import { Body, Controller, Get , Param, Post, Query, Render , Req, Res, Response } from '@nestjs/common';
import { join } from 'path';
import { CorsService } from './cors.service';


@Controller('cors')
export class CorsController {
  
  constructor(private readonly corsService: CorsService) { }

  @Get('user')
  @Render('user')
  index(@Req() req) {
    return {
      username: req.userData.username,
      balance: req.userData.balance
    }
  }

  @Get('login')
  loginPage(@Res() res){
    res.sendFile(join(__dirname, '../../' , 'public/login.html'))
  }

  @Post('login')
  login(@Req() req , @Res() res , @Body() body) {
    const userData = this.corsService.login(body)
    if(userData !== undefined) {
      (req as any).mySession.setSession(userData , res)
    
      res.statusCode = 302
      res.setHeader('location' , '/cors/user')
      res.send()

    }else res.send('Password error!') 
  }

  @Get('consume')
  consume(@Req() req , @Res() res , @Query() query) {
    this.corsService.consume(req.userData.username , query.amount)
    res.statusCode = 302
    res.setHeader('location' , '/cors/user')
    res.send()
  }
} 