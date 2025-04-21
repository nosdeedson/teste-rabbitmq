import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigRabbitmq } from './config/config-rabbitmq/config-rabbitmq';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(ConfigRabbitmq.connectMicroservice('queue_one', false));
  app.connectMicroservice<MicroserviceOptions>(ConfigRabbitmq.connectMicroservice('queue_second', false))
  app.connectMicroservice<MicroserviceOptions>(ConfigRabbitmq.connectMicroservice('emitir', false));
  app.connectMicroservice<MicroserviceOptions>(ConfigRabbitmq.connectMicroservice('delayed_queue', true));
  // app.connectMicroservice<MicroserviceOptions>(ConfigRabbitmq.connectMicroservice('payment_queue', true));

 
  await app.startAllMicroservices();

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
