import { Body, Controller, Get , Param, Post, Query, Render , Response } from '@nestjs/common';
import { XssService } from './xss.service';
// import { join } from 'path'

@Controller('xss')
export class XssController {
  
  constructor(private readonly xssService: XssService) { }

  @Get('index')
  index(@Response() res) {
    // res.sendFile(join(__dirname , '../../' , 'public/index.html'))
  }

  // 反射型 xss
  @Get('reflect')
  @Render('reflect')
  reflect(@Query() param) {
    return {query: param.name}
  }


  // 存储型 xss
  @Get('accountList')
  @Render('accountList')
  accountList(@Response() res) {
    res.cookie('administrator' , 'username=admin&password=mima')
    return {
      template: this.xssService.getTemplate()
    }
  }

  @Get('addAccount')
  @Render('addAccount') 
  addAccount() {
    return {}
  }
  
  @Post('addAccount')
  @Render('addAccount')
  addAccount2(@Body() body) {
    if(body.username && body.password) {
      this.xssService.setAccount(body)
    }
    return {}
  }
} 