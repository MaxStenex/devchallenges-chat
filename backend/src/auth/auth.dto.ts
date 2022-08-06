import { IsEmail, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @MinLength(1)
  @MaxLength(50)
  username: string;

  @MinLength(6)
  @MaxLength(255)
  password: string;
}

export class LoginDto {
  @IsEmail()
  @MinLength(1)
  email: string;

  @MinLength(1)
  password: string;
}
