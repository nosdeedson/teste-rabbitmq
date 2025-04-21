import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerPaymentQueueService } from './consumer-payment-queue.service';

describe('ConsumerPaymentQueueService', () => {
  let service: ConsumerPaymentQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumerPaymentQueueService],
    }).compile();

    service = module.get<ConsumerPaymentQueueService>(ConsumerPaymentQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
