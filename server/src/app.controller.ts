import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  async getUsers() {
    return this.appService.getUsers();
  }

  @Post('users')
  async addUser(@Body() data) {
    return this.appService.addUser(data);
  }
}
