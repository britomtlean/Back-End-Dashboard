import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { Usuario } from 'src/types/UsuarioType';

@Injectable()
export class UsuariosService {
constructor(private readonly prisma: PrismaService){}

async listarUsers(){
    const listUsers = await this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true,
        senha: false,
      },
    });
    return listUsers
}

async createUser(user:Usuario): Promise<object> {

 const newUser: Usuario = await this.prisma.usuario.create({
    data: {
        nome: user.nome,
        cpf: user.cpf,
        email: user.email,
        senha: user.senha
    }
 })

 const {senha: _, ... userSemSenha} = newUser
 return { message: "Usuario criado com sucesso", "Usuario:": userSemSenha}

}


}
