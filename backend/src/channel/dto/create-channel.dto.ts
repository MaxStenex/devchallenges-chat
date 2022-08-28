import { MaxLength, MinLength } from "class-validator";

export class CreateChannelDto {
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @MinLength(1)
  @MaxLength(255)
  description: string;
}
