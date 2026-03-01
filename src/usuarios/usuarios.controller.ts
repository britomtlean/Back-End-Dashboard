import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import type { Usuario } from 'src/types/UsuarioType';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Get('/listar')
  async listar() {
    return await this.service.listarUsers();
  }

  @Post('/cadastrar')
  async cadastrar(@Body() user: Usuario) {
    return await this.service.createUser(user);
  }
}
