import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signin(email: string, password: string): object {
    console.log('email', email);
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
