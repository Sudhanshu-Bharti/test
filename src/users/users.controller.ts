
    import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
    import { UsersService } from './users.service';
    import { CreateUserDto } from './dto/create-user.dto';
    import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
    
    @ApiTags('users')
    @Controller('users')
    export class UsersController {
      constructor(private readonly usersService: UsersService) {}
    
      @Post()
      @ApiOperation({ summary: 'Create a new user' })
      @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
      @ApiResponse({ status: 400, description: 'Bad Request.' })
      create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto.name, createUserDto.password);
      }
    
      @Get()
      @ApiOperation({ summary: 'Get all users' })
      @ApiResponse({ status: 200, description: 'Return all users.' })
      findAll() {
        return this.usersService.findAllUsers();
      }
    
      @Get(':id')
      @ApiOperation({ summary: 'Get a user by ID' })
      @ApiResponse({ status: 200, description: 'Return a user.' })
      @ApiResponse({ status: 404, description: 'User not found.' })
      findOne(@Param('id') id: number) {
        return this.usersService.findUserById(id);
      }
    
      @Put(':id')
      @ApiOperation({ summary: 'Update a user' })
      @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
      @ApiResponse({ status: 404, description: 'User not found.' })
      update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
        return this.usersService.updateUser(id, createUserDto.name, createUserDto.password);
      }
    
      @Delete(':id')
      @ApiOperation({ summary: 'Delete a user' })
      @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
      @ApiResponse({ status: 404, description: 'User not found.' })
      remove(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
      }
    
      @Post('login')
      @ApiOperation({ summary: 'User login' })
      @ApiResponse({ status: 200, description: 'Login successful.' })
      @ApiResponse({ status: 401, description: 'Invalid credentials.' })
      async login(@Body() createUserDto: CreateUserDto) {
        const isValid = await this.usersService.validateUserPassword(createUserDto.name, createUserDto.password);
        if (isValid) {
          return { message: 'Login successful' };
        } else {
          return { message: 'Invalid credentials' };
        }
      }
    }
    
