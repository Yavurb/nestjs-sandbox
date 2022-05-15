import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getAllUsers(): object {
    return { message: 'This action returns all users' };
  }

  async editUser(userDto: UserDto, userId: User['id']): Promise<User> {
    const udpatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...userDto,
      },
    });

    delete udpatedUser.hash;

    return udpatedUser;
  }
}
