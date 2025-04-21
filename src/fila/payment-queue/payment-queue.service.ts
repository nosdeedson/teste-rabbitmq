import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class PaymentQueueService implements OnModuleInit, OnModuleDestroy {

    private channel: amqp.Channel;
    private connection: amqp.Connection;
    private readonly exchange = 'payment_exchange';
    private readonly queue = 'payment_queue';
    private readonly routingKey = 'payment.create';

    onModuleDestroy() {
        this.channel.close();
        this.connection.close();
    }

    async onModuleInit() {
        this.connection = await amqp.connect('amqp://rabbitmq:rabbitmq@localhost:5672');
        this.channel = await this.connection.createChannel();
        await this.channel.assertExchange(this.exchange, 'x-delayed-message', {
            durable: true,
            arguments: {
                'x-delayed-type': 'direct',
            }
        });
        await this.channel.assertQueue(this.queue, { durable: true });
        await this.channel.bindQueue(this.queue, this.exchange, this.routingKey);
        
    }

    async sendPaymentMessage(routingKey: string, message: any, delay: number) {
        const payload = {
            pattern: routingKey,
            data: message,
        };
        this.channel.publish(
            this.exchange, // the x-delayed-message exchange
            this.routingKey,
            Buffer.from(JSON.stringify(message)),
            {
                headers: {
                    'x-delay': delay,
                    pattern: 'payment.create',
                },
                persistent: true,
            }
        );
        console.log(`Sent delayed message (${delay}ms):`, message);
    }
    
    
}
