import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getAll();
  }

  @Post("/create")
  async createUser(@Body() createUserData) {
    return this.userService.create(createUserData);
  }
}
