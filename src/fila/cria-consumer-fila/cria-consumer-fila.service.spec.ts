import { Test, TestingModule } from '@nestjs/testing';
import { CriaConsumerFilaService } from './cria-consumer-fila.service';

describe('CriaConsumerFilaService', () => {
  let service: CriaConsumerFilaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriaConsumerFilaService],
    }).compile();

    service = module.get<CriaConsumerFilaService>(CriaConsumerFilaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
