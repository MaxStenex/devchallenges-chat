import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from "@nestjs/common";
import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

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

  @UseGuards(JwtAuthGuard)
  @Post("/logout")
  async logout(@Response({ passthrough: true }) res) {
    return this.authService.logout(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  async me(@Request() req) {
    return this.authService.me(req.user.id);
  }
}
