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
import { TreinoController } from './treino/treino.controller';
import { TreinoService } from './treino/treino.service';
import { TreinoModule } from './treino/treino.module';

@Module({
  imports: [UsuariosModule, PrismaModule, TarefasModule, AuthModule, TreinoModule],
  controllers: [AppController, TarefasController, TreinoController],
  providers: [AppService, PrismaService, UsuariosService, TarefasService, TreinoService],
})
export class AppModule {}
