import { Injectable } from "@nestjs/common";

@Injectable()
export class CorsService {
  account: Map<string , any> = new Map([
    ['admin' , {
      username: 'admin',
      password: 'Abc12345',
      balance: 100
    }],
    ['Snjjsvsand' , {
      username: 'Snjjsvsand',
      password: 'mima',
      balance: 200
    }]
  ])

  login(user: {username: string , password: string}): any {
    if(!this.account.has(user.username)) return undefined
    const userData = this.account.get(user.username)
    if(user.password === userData.password) return userData
    return undefined
  }

  consume(username: string , amount: number) {
    const userData = this.account.get(username)
    userData.balance -= amount
  }
  
} 