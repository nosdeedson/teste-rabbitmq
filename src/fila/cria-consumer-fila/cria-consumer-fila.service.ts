import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as ampq from 'amqplib';

export interface ConsumerDto {
    exchange: string;
    queue: string;
    routingKey: string;
    channel: ampq.Channel;
}

// @Injectable()
export abstract class CriaConsumerFilaService  {

    private connection: ampq.Connection;
    private readonly url = 'amqp://rabbitmq:rabbitmq@localhost:5672';
    public dto: ConsumerDto;


    async criaConsumer(callBack: any){
        this.connection = await ampq.connect(this.url);
        this.dto.channel = await this.connection.createChannel();
        await this.dto.channel.assertQueue(this.dto.queue, { durable: true });
        await this.dto.channel.consume(this.dto.queue, (msg) => {
            if (msg){
                const content = msg.content.toString();
                console.log('Manual consume:', content);
                // Acknowledge the message
                this.dto.channel.ack(msg);
                callBack(content);
            }
        });
    }

    async closeConnection() {
        if (this.connection) {
            await this.connection.close();
        }
        if( this.dto.channel) {
            await this.dto.channel.close();
        }
    }
    
}
