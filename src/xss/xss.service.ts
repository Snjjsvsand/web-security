import { Injectable } from "@nestjs/common";

type Account = {
  username: string,
  password: string
}

@Injectable()
export class XssService {
  private accounts: Account[]

  constructor() {
    this.accounts = [
      {
        username: 'admin',
        password: 'mima'
      }
    ]
  }

  setAccount(account: Account): void {
    this.accounts.push(account)
  }

  getAccounts(): Array<Account> {
    return this.accounts
    
  }

  getTemplate():string {
    let template = ''
    this.getAccounts().forEach(e => {
      template += `
        <div>
          <span>账户：</span><span>${e.username}</span>
          <span>密码：</span><span>${e.password}</span>
        </div>
      `
    })
    return template
  }
}