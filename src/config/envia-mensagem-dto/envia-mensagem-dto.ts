export class EnviaMensagemDto {
    exchange: string;
    routingKey: string;
    mensagem: any;
    delay: number;
    queue: string;
    pattern: string;
}
