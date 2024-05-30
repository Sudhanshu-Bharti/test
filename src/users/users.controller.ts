// src/users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body) {
    return this.usersService.createUser(body.name, body.password);
  }

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findUserById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.usersService.updateUser(id, body.name, body.password);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @Post('login')
  async login(@Body() body) {
    const isValid = await this.usersService.validateUserPassword(body.name, body.password);
    if (isValid) {
      return { message: 'Login successful' };
    } else {
      return { message: 'Invalid credentials' };
    }
  }
}
