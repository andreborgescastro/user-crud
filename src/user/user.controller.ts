import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.getUsers();
  }

  @Post()
  create(@Body() userPostDto: any) {
    return userPostDto;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'Obtenção de usuário por ID:' + id;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return { id, updateUserDto };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'Remoção de usuário por ID' + id;
  }
}
