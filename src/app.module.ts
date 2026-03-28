import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PrismaModule } from './prisma/prisma.module';
import { TarefasService } from './tarefas/tarefas.service';
import { TarefasController } from './tarefas/tarefas.controller';
import { TarefasModule } from './tarefas/tarefas.module';
import { AuthModule } from './auth/auth.module';
import { TreinoController } from './treinos/treino.controller';
import { TreinoService } from './treinos/treino.service';
import { TreinoModule } from './treinos/treino.module';
import { UsuariosController } from './usuarios/usuarios.controller';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsuariosModule,
    TarefasModule,
    TreinoModule,
  ],
  controllers: [
    AppController,
    UsuariosController, 
    TarefasController,
    TreinoController
  ],
  providers: [
    AppService,
    PrismaService,
    UsuariosService,
    TarefasService,
    TreinoService,
  ],
})
export class AppModule {}
