import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { CriaConsumerFilaService } from "../cria-consumer-fila.service";

export class BoletoCnabEmitiQueue extends CriaConsumerFilaService implements OnModuleInit, OnModuleDestroy {

    async onModuleInit() {
        this.dto = {
            exchange: 'boleto_cnab_emitir_exchange',
            queue: 'boleto_cnab_emitir_queue',
            routingKey: 'boleto_cnab.create',
            channel: null,
        };
        this.criaConsumer(this.processMessage);
    }

    async onModuleDestroy() {
        this.closeConnection();
    }

    async processMessage(msg: string) {
        try {
            const message = JSON.parse(msg);
            console.log('Processing message:', message['teste']);
            console.log('Processing message:', message['message']);
            // Simulate processing time
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }
}
