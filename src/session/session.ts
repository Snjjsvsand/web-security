import { Request, Response } from 'express'

export interface Provider {
  capacity?: number
  maxAge?: number
  
  get(sid: string): any
  set(sid: string , value: any): void
  garbageCollect(sid: string): void 
}

export interface SessionOptions {
  sidGenerator?: (args: any) => string,
  capacity?: number,
  maxAge?: number
}

export class SessionManager {
  provider: Provider
  sidGenerator: (args: any) => string = (arg) => JSON.stringify(arg) + '#' + Date.now()

  constructor(provider: Provider, options: SessionOptions) {
    this.provider = provider
    if(options.capacity) this.provider.capacity = options.capacity
    if(options.maxAge) this.provider.maxAge = options.maxAge
    if(options.sidGenerator) this.sidGenerator = options.sidGenerator
  }

  setSession(userData: any , res: Response) {
    const sid = this.sidGenerator(userData)
    this.provider.set(sid , userData)
    res.cookie('sid' , sid)
  }

  getSession(req: Request) {
    const sid = req.cookies.sid
    return this.provider.get(sid)
  }
}


