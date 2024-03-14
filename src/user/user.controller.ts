import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  findAll() {
    return 'Obtenção de todos os usuários';
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
