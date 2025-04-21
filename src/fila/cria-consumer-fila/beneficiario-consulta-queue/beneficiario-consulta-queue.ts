import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { CriaConsumerFilaService } from "../cria-consumer-fila.service";

export class BeneficiarioConsultaQueue extends CriaConsumerFilaService implements OnModuleInit, OnModuleDestroy {
    
    onModuleInit() {
        this.dto = {
            exchange: 'beneficiario_consulta_exchange',
            queue: 'beneficiario_consulta_queue',
            routingKey: 'beneficiario.update',
            channel: null,
        };
        this.criaConsumer(this.processMessage)
    }

    onModuleDestroy() {
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
