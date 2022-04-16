import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import type { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(authDto: AuthDto): Promise<User> {
    const hash = await argon.hash(authDto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: authDto.email,
          hash,
        },
      });

      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already exists');
        }
      }

      throw error;
    }
  }

  signin(): object {
    return {
      message: 'i have signed up',
    };
  }
}
