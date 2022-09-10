import { Body, Controller, Get, Post, Request, Response } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("/login")
  async login(
    @Body() loginDto: LoginDto,
    @Response({ passthrough: true }) res,
  ) {
    return this.authService.login({ loginDto, res });
  }

  @Post("/logout")
  async logout(@Response({ passthrough: true }) res) {
    return this.authService.logout(res);
  }

  @Get("/me")
  async me(@Request() req) {
    return this.authService.me(req.user.id);
  }
}
