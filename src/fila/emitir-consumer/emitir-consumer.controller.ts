import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmitirConsumerService } from './emitir-consumer.service';

@Controller('emitir-consumer')
export class EmitirConsumerController {

    constructor(private consumerService: EmitirConsumerService) { }
    @MessagePattern('emitindo')
    handleMessage(@Payload() data: any) {
        this.consumerService.handleMessage(data);
    }
}
