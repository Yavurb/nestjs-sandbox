import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import type { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getAll(@Req() req: Request) {
    console.log('req.user', req.user);
    return this.userService.getAllUsers();
  }
}
