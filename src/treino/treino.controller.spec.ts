import { Test, TestingModule } from '@nestjs/testing';
import { TreinoController } from './treino.controller';

describe('TreinoController', () => {
  let controller: TreinoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreinoController],
    }).compile();

    controller = module.get<TreinoController>(TreinoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
