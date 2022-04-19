import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUsers(): object {
    return { message: 'This action returns all users' };
  }
}
