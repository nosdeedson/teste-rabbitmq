import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmitirService } from './fila/emitir/emitir.service';
import { EmitirConsumerService } from './fila/emitir-consumer/emitir-consumer.service';
import { EmitirConsumerModule } from './fila/emitir-consumer/emitir-consumer.module';
import { ConfigRabbitmq } from './config/config-rabbitmq/config-rabbitmq';
import { WithDelayService } from './fila/with-delay/with-delay.service';
import { WithDelayConsumerModule } from './fila/with-delay-consumer/with-delay-consumer.module';
import { WithDelayServiceDebug } from './fila/with-delay/with-delay.service-debug';
import { PaymentQueueService } from './fila/payment-queue/payment-queue.service';
import { ConsumerPaymentQueueService } from './fila/consumer-payment-queue/consumer-payment-queue.service';
import { CriaFilaService } from './fila/cria-fila/cria-fila.service';
import { CriaConsumerFilaService } from './fila/cria-consumer-fila/cria-consumer-fila.service';
import { BeneficiarioConsultaQueue } from './fila/cria-consumer-fila/beneficiario-consulta-queue/beneficiario-consulta-queue';
import { BoletoCnabEmitiQueue } from './fila/cria-consumer-fila/boleto-cnab-emiti-queue/boleto-cnab-emiti-queue';

@Module({
  imports: [
    ClientsModule.register(ConfigRabbitmq.register('queue_one')),
    ClientsModule.register(ConfigRabbitmq.register('queue_second')),
    EmitirConsumerModule,
    WithDelayConsumerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmitirService,
    EmitirConsumerService,
    WithDelayService,
    PaymentQueueService,
    ConsumerPaymentQueueService,
    CriaFilaService,
    BeneficiarioConsultaQueue,
    BoletoCnabEmitiQueue
    // WithDelayServiceDebug,
  ],
})
export class AppModule {}

