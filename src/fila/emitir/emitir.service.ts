import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class EmitirService {
    private client: ClientProxy;
    constructor() { 
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
                queue: 'emitir',
                queueOptions: {
                    durable: false,
                },
            },
        });
    }

    async sendMessage(message: any) : Promise<string> {
        console.log('emitindo', message);
        this.client.emit('emitindo', message);
        return 'emitido';
    }
}
