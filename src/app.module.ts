import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmitirService } from './fila/emitir/emitir.service';
import { EmitirConsumerService } from './fila/emitir-consumer/emitir-consumer.service';
import { EmitirConsumerModule } from './fila/emitir-consumer/emitir-consumer.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
          queue: 'queue_one',
          queueOptions: {
            durable: false,
          }
        }
      }
    ]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
          queue: 'queue_second',
          queueOptions: {
            durable: false,
          }
        }
      }
    ]),
    EmitirConsumerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmitirService,
    EmitirConsumerService,
  ],
})
export class AppModule {}

