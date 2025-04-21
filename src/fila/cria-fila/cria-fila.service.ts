import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { FilaDto, FilasDto } from 'src/config/filas-dto/filas-dto';


@Injectable()
export class CriaFilaService implements OnModuleInit, OnModuleDestroy {
    private channel: amqp.Channel;
    private connection: amqp.Connection;
    private readonly url = 'amqp://rabbitmq:rabbitmq@localhost:5672';

    private readonly dto : FilaDto[] = FilasDto.createFilas();

    async onModuleInit() {
        for (const fila of this.dto) {
            await this.criarFila(fila);
        }
    }
    
    async onModuleDestroy() {
        if (this.channel) {
            await this.channel.close();
        }
        if (this.connection) {
            await this.connection.close();
        }
        console.log('Conexão com RabbitMQ fechada.');
    }


    private async criarFila(dto: FilaDto): Promise<void> {
        this.connection = await amqp.connect(this.url);
        this.channel = await this.connection.createChannel();
        await this.channel.assertExchange(dto.exchange, 'x-delayed-message', {
            durable: true,
            arguments: {
                'x-delayed-type': 'direct',
            }
        });
        await this.channel.assertQueue(dto.queue, { durable: true });
        await this.channel.bindQueue(dto.queue, dto.exchange, dto.routingKey);
        console.log(`Fila criada: ${dto.queue}`);
    }

    async enviarMensagem(
        exchange: string,
        routingKey: string,
        mensagem: any,
        delay: number,
        fila: string, 
        pattern: string,
    ): Promise<void> {
        const buffer = Buffer.from(JSON.stringify(mensagem));
        await this.channel.publish(
            exchange,
            routingKey,
            buffer,
            {
                headers: {
                    'x-delay': delay,
                    pattern: pattern
                },
                persistent: true,
            }
        );
        console.log(`Mensagem enviada para a fila ${fila}: ${mensagem}`);
    }


}
