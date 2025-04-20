import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('send')
  async sendMessage() {
    const response = await this.appService.sendMessage( 'Hello RabbitMQ!' );
    return { response };
  }

  @Get('send-second')
  async sendMessage1() {
    const response = await this.appService.sendMessage1( 'Hello RabbitMQ second!' );
    return { response };
  }

  @MessagePattern('message_sent')
  handleMessage(@Payload() data: any) {
    console.log('Received from RabbitMQ:', data);
    return `Received your message: ${JSON.stringify(data)}`;
  }

  @MessagePattern('message_sent_1')
  handleMessage1(@Payload() data: any) {
    console.log('Received from RabbitMQ:', data);
    return `Received your message: ${JSON.stringify(data)}`;
  }


}
