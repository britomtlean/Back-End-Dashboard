import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Body,
  Req,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TarefasService } from './tarefas.service';

@Controller('task')
export class TarefasController {
  constructor(private readonly service: TarefasService) {}

  //ROTA PARA CRIAR TAREFA
  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  async createTask(@Body() task: any, @Req() req: any) {
    return await this.service.createTask(req.user, task);
  }
  ////////////////////////////////////////////////////////////////

  //ROTA QUE ENVIA TAREFAS PARA O USUÁRIO EXTRAIDO DO TOKEN
  @Get('/get')
  @UseGuards(AuthGuard('jwt'))
  async sendTask(@Req() req: any) {
    return await this.service.getTask(req.user);
  }
  ///////////////////////////////////////////////////////////////

  //ROTA PARA DELETAR TAREFA
  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() user: any
  ) {
    return this.service.deleteTask(id, user);
  }
  ////////////////////////////////////////////////////////////

  @Put('/update/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() user: any
) {
    return this.service.updateTask(id, user);
  }
}

