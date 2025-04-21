import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EmitirService } from './fila/emitir/emitir.service';
import { WithDelayService } from './fila/with-delay/with-delay.service';
import { PaymentQueueService } from './fila/payment-queue/payment-queue.service';
import { CriaFilaService } from './fila/cria-fila/cria-fila.service';
import { EnviaMensagemDto } from './config/envia-mensagem-dto/envia-mensagem-dto';

@Injectable()
export class AppService {
  private client: ClientProxy;
  private client1: ClientProxy;
  constructor(
    private readonly emitir: EmitirService,
    private readonly queueDelay: WithDelayService,
    private readonly paymentQueueService: PaymentQueueService,
    private readonly criarFila: CriaFilaService,
  ) { 
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
        queue: 'queue_one',
        queueOptions: {
          durable: false,
        },
      }
    })
    this.client1 = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
        queue: 'queue_second',
        queueOptions: {
          durable: false,
        },
      }
    })
  }

  async sendMessage(message: string) : Promise<string> {
    this.client.emit('message_sent', message);
    return 'message sent';
  }

  async sendMessage1(message: string) : Promise<string> {
    this.client.emit('message_sent_1', message);
    return 'message sent';
  }

  async emitindo(message: any) : Promise<string> {
    this.emitir.sendMessage(message);
    return 'emitido';
  }

  async withDelay(message: any): Promise<string> {
    this.queueDelay.sendDelayedMessage('task.create', message, 5000);
    return 'emitido com delay';
  }

  async sendPaymentQueue(message: any): Promise<string> {
    this.paymentQueueService.sendPaymentMessage('payment.create', message, 5000);
    return 'emitido com delay';
  }

  async enviaMensagemGenerica(message: EnviaMensagemDto): Promise<string> {
    this.criarFila.enviarMensagem(
      message.exchange,
      message.routingKey,
      message.mensagem,
      message.delay,
      message.queue,
      message.pattern,
    );
    return 'mensagem criada';
  }
  

  getHello(): string {
    return 'Hello World!';
  }
}
