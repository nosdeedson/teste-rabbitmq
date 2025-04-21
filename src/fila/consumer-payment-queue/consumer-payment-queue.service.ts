import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as ampq from 'amqplib';

@Injectable()
export class ConsumerPaymentQueueService implements OnModuleInit, OnModuleDestroy {

    private channel: ampq.Channel;
    private connection: ampq.Connection;
    private readonly queue = 'payment_queue';

    constructor( ) {}

    async onModuleInit() {
        this.connection = await ampq.connect('amqp://rabbitmq:rabbitmq@localhost:5672');
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(this.queue, { durable: true });
        await this.channel.consume(this.queue, (msg) => {
            if (msg) {
                const content = msg.content.toString();
                console.log('Manual consume:', content);
                // Acknowledge the message
                this.channel.ack(msg);
                this.processMessage(content);
            } else {
                console.log('No message received');
            }
        });
    }

    onModuleDestroy() {
        this.channel.close();
        this.connection.close();
    }
    
    private async processMessage(msg: string) {
        try {
            const message = JSON.parse(msg);
            console.log('Processing message:', message['queue']);
            console.log('Processing message:', message['message']);
            // Simulate processing time
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }
    
}
