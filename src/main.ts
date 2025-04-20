import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
      queue: 'queue_one',
      queueOptions: {
        durable: false,
      }
    }
  })

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
      queue: 'queue_second',
      queueOptions: {
        durable: false,
      }
    }
  })

  

 
  app.startAllMicroservices();

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
