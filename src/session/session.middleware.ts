import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request , Response} from 'express'
import { SessionManager } from './session'
import LRUProvider from './LRU.provider';

@Injectable()
export class SesscionMiddlware implements NestMiddleware {
  session: SessionManager

  constructor() {
    this.session = new SessionManager(new LRUProvider() , {
      capacity: 10,
      maxAge: 6 * 10,
      sidGenerator: (userData: any) => JSON.stringify(userData.username) + '#' + Date.now()
    })
  }
  
  use(req: Request, res: Response, next: () => void) {
    (req as any).mySession = this.session
    
    // 登录页面及 session 通过的页面放行
    if(req.path === '/cors/login' ) return next()

    const userData = this.session.getSession(req)

    if(userData === undefined) {
      res.statusCode = 302
      res.setHeader('location' , '/cors/login')
      res.send()
    }else {
      (req as any).userData = userData
      return next()
    }
  }
}
