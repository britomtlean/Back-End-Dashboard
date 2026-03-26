import { Test, TestingModule } from '@nestjs/testing';
import { TarefasService } from './tarefas.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TarefasService', () => {
  let service: TarefasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TarefasService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TarefasService>(TarefasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
