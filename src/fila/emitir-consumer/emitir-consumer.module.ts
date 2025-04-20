import { Module } from '@nestjs/common';
import { EmitirConsumerController } from './emitir-consumer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmitirConsumerService } from './emitir-consumer.service';

@Module({
  imports: [
    ClientsModule.register([
          {
            name: 'emitindo',
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
              queue: 'emitir',
              queueOptions: {
                durable: false,
              }
            }
          }
        ]),
  ],
  controllers: [EmitirConsumerController],
  providers: [EmitirConsumerService]
})
export class EmitirConsumerModule {}
