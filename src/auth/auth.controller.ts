import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  singin(@Body() body: AuthDto) {
    const email = body.email;
    const password = body.password;

    return this.authService.signin(email, password);
  }

  @Post('signup')
  signup() {
    return this.authService.signup();
  }
}
