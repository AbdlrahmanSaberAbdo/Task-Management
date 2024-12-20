import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Pageable, PageableDefault } from 'nestjs-mikro-orm-pageable';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('/')
  async findAll(@PageableDefault() pageable: Pageable) {
    console.log(pageable)
    return await this.usersService.findAll(pageable);
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return await this.usersService.findOne(email);
  }

  @Patch(':email')
  async update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(email, updateUserDto);
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    return await this.usersService.remove(email);
  }
}
