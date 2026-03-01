import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

@Module({
  imports: [],
  controllers: [UsuariosController], //Rotas
  providers: [UsuariosService], //Services
  exports: [],
})
export class UsuariosModule {}
