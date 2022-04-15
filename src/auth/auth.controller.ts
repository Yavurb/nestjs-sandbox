import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const username = body.username;
    const password = body.password;

    return this.authService.signin(username, password);
  }

  @Post('signup')
  signup() {
    return this.authService.signup();
  }
}
