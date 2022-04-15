import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin(username: string, password: string): object {
    console.log('username', username);
    console.log('password', password);
    return {
      token: 'token',
    };
  }

  signup(): object {
    return {
      message: 'i have signed up',
    };
  }
}
