import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ])
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}

