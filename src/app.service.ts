import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;
  private client1: ClientProxy;
  constructor() { 
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

  getHello(): string {
    return 'Hello World!';
  }
}
