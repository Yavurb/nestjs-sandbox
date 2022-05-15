import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { UserDto } from './dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getAll(@GetUser() user: User): User {
    return user;
  }

  @Patch('me')
  editMe(@Body() userDto: UserDto, @GetUser('id') userId: User['id']) {
    return this.userService.editUser(userDto, userId);
  }
}
