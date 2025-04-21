import { Test, TestingModule } from '@nestjs/testing';
import { CriaFilaService } from './cria-fila.service';

describe('CriaFilaService', () => {
  let service: CriaFilaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriaFilaService],
    }).compile();

    service = module.get<CriaFilaService>(CriaFilaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
