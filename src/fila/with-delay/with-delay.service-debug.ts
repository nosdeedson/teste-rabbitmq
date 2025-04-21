import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class WithDelayServiceDebug { // implements OnModuleInit, OnModuleDestroy {
    
    private channel: amqp.Channel;
    private connection: amqp.Connection;
    
    async onModuleInit() {
        const connection = await amqp.connect('amqp://rabbitmq:rabbitmq@localhost:5672');
        const channel = await connection.createChannel();
    
        const queue = 'delayed_queue';
    
        // Just to be safe — assert the queue exists
        await channel.assertQueue(queue, { durable: true });
    
        // Consume messages manually
        await channel.consume(queue, (msg) => {
          if (msg) {
            const content = msg.content.toString();
            console.log(' Manual consume:', content);
    
            // Acknowledge the message
            channel.ack(msg);
          }
        });
    
        console.log(`Listening manually to queue "${queue}"`);
      }

      onModuleDestroy() {
        this.channel.close();
        this.connection.close();
    }

}
