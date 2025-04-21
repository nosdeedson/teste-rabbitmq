import { Controller } from '@nestjs/common';
import { WithDelayConsumerService } from './with-delay-consumer.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('with-delay-consumer')
export class WithDelayConsumerController {

    constructor(private withDelayService: WithDelayConsumerService) { }

    @MessagePattern('task.create')
    handleMessage(@Payload() data: any, @Ctx() context: RmqContext) {
        const pattern = context.getPattern();
        console.log('Received message with pattern:', pattern);
        console.log('Data:', data);
        this.withDelayService.handleMessage(data);
    }

}
