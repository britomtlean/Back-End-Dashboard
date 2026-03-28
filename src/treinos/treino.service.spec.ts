import { Test, TestingModule } from '@nestjs/testing';
import { TreinoService } from './treino.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TreinoService', () => {
  let service: TreinoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreinoService,
        {
          provide: PrismaService,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<TreinoService>(TreinoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
