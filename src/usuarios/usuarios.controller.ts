import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { AuthGuard } from '@nestjs/passport';
import type { UpdateUser } from 'src/types/AuthBody';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Get('/listar')
  async listar() {
    return await this.service.listarUsers();
  }

  @Put('/update')
  @UseGuards(AuthGuard('jwt'))
  updateUser(@Body() userBody: UpdateUser, @Req() req: any){
    return this.service.updateUser(userBody, req.user)
  }

}
