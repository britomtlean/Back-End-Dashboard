/*CÓDIGO PARA VALIDAÇÃO DE TOKEN JWT

PassportStrategy - MÉTODO QUE CHAMA CLASSE PARA AUTENTICAÇÃO
Strategy - CLASSE QUE DEFINE AUTENTICAÇÃO JWT

*/

import { Injectable, UnauthorizedException } from '@nestjs/common';

//VJWT
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//COOKIE
import { Request } from 'express';

//PRISMA
import { PrismaService } from 'src/prisma/prisma.service';

type JwtPayload = {
  sub: number;
  nome: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  //VALIDA O TOKEN E EXTRAI O PAYLOAD
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        //EXTRAI TOKEN VIA COOKIE
        (request: Request) => {
          return request?.cookies?.token;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET as string, //RECEBE A CHAVE JWT PARA VALIDAÇÃO
    });
  }

  async validate(payload: JwtPayload) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true
      },
    });


    if (!usuario) {
      console.log('Usuário não encontrado')
      throw new UnauthorizedException("Erro de Login");
    }

    console.log('Usuario enviado:', usuario)
    return usuario;
  }
}
