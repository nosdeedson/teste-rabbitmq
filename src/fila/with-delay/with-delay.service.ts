import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class WithDelayService implements OnModuleInit, OnModuleDestroy {
    
    private channel: amqp.Channel;
    private connection: amqp.Connection;
    private readonly exchange = 'delayed_exchange';
    private readonly queue = 'delayed_queue';
    private readonly routingKey = 'task.create';
    
    async onModuleInit() {
        this.connection = await amqp.connect('amqp://rabbitmq:rabbitmq@localhost:5672');
        this.channel = await this.connection.createChannel();

        await this.channel.assertExchange(this.exchange, 'x-delayed-message', {
            durable: true,
            arguments: {
                'x-delayed-type': 'direct',
            }
        });

        await this.channel.assertQueue(this.queue, {durable: true});
        await this.channel.bindQueue(this.queue, this.exchange, this.routingKey);
        // await this.channel.bindQueue('delayed_queue', 'delayed_exchange', 'task.create');
    }

    onModuleDestroy() {
        this.channel.close();
        this.connection.close();
    }

    async sendDelayedMessage(routingKey: string, message: any, delay: number) {
        const payload = {
            pattern: routingKey,
            data: message,
          };
        this.channel.publish(
            this.exchange, // the x-delayed-message exchange
            routingKey,
            Buffer.from(JSON.stringify(payload)),
            {
                headers: {
                    'x-delay': delay,
                    pattern: 'task.create',
                },
                persistent: true,
            }
        );
        console.log(`Sent delayed message (${delay}ms):`, message);
    }
    

}
