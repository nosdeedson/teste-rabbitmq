import { Injectable } from '@nestjs/common';

@Injectable()
export class EmitirConsumerService {

    handleMessage(data: any) {
        console.log('Received from RabbitMQ:', data);
        return `Received your message: ${JSON.stringify(data)}`;
    }
}
