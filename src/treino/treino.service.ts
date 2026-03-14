import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { PrismaService } from 'src/prisma/prisma.service';
import type { ExerciseBody, TrainingBody } from 'src/types/Training';
import { UsuarioLogado } from 'src/types/UsuarioLogado';

@Injectable()
export class TreinoService {
  constructor(private readonly prisma: PrismaService) {}

  /************************************* CREATE *********************************** */

  async createTraining(
    training: TrainingBody,
    user: UsuarioLogado,
  ): Promise<Record<string, any>> {
    console.log('usuario logado:', user.id, 'treino recebido:', training);

    if (training.diaSemana < 0 || training.diaSemana > 6) {
      throw new NotFoundException('Dia da semana incompatível');
    }

    const newTraining = await this.prisma.treino.create({
      data: {
        id_TipoTreino: training.musculo,
        diaSemana: training.diaSemana,
        id_usuario: user.id,
      },
    });

    console.log('Novo treino criado:', newTraining, new Date());
    return newTraining;
  }

  /*********************************** ADD EXERCICIO NO TREINO*********************************** */

  async addExercise(exercise: ExerciseBody): Promise<Record<string, any>> {
    const newExercise = await this.prisma.exercicio.create({
      data: {
        id_Treino: exercise.idTreino,
        id_SubTipoTreino: exercise.idSubTipoTreino,
        serie: exercise.serie,
      },
    });

    console.log('Treino adicionado:', newExercise, new Date());
    return newExercise;
  }

  /**************************************** ENVIAR TREINO DO DIA********************************** */

  async sendTrainingDay(user: UsuarioLogado) {
    const data = new Date();
    const today = data.getDay();

    const trainingDay = await this.prisma.treino.findMany({
      where: {
        diaSemana: today,
        id_usuario: user.id,
      },
      include: {
        usuarios: {
          select: {
            nome: true,
          },
        },
        TipoTreino: {
          select: {
            nome: true,
          },
        },
        Exercicio: {
          include: {
            SubTipoTreino: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });

    if (!trainingDay.length) {
      throw new NotFoundException('Não há treinos registrados para este dia');
    }

    console.log('Treinado registrado:', trainingDay);
    return trainingDay;
  }
}
