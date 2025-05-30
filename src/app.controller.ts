import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EnviaMensagemDto } from './config/envia-mensagem-dto/envia-mensagem-dto';

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

  @Post('emitir')
  async emitir(@Body() body: any) {
    const response = await this.appService.emitindo( body );
    return { response };
  }

  @Post('with-delay')
  async withDelay(@Body() body: any) {
    const response = await this.appService.withDelay( body );
    return { response };
  }

  @Post('payment-queue')
  async paymentQueue(@Body() body: any) {
    const response = await this.appService.sendPaymentQueue( body );
    return { response };
  }

  @Post('envia-mensagem')
  async beneficiarioConsulta(@Body() body: EnviaMensagemDto) {
    const response = await this.appService.enviaMensagemGenerica( body );
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
