import { Module } from '@nestjs/common';
import { WithDelayConsumerController } from './with-delay-consumer.controller';
import { WithDelayConsumerService } from './with-delay-consumer.service';
import { ConfigRabbitmq } from 'src/config/config-rabbitmq/config-rabbitmq';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register( ConfigRabbitmq.register('delayed_queue'))
  ],
  controllers: [WithDelayConsumerController],
  providers: [WithDelayConsumerService],
})
export class WithDelayConsumerModule {}
