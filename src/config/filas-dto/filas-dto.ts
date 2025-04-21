export interface FilaDto {
    exchange: string;
    queue: string;
    routingKey: string;
}

export abstract  class FilasDto {
    static createFilas(): FilaDto[] {
        return [
            {
                exchange: 'boleto_emitir_exchange',
                queue: 'boleto_emitir_queue',
                routingKey: 'boleto.create',         
            },
            {
                exchange: 'beneficiario_consulta_exchange',
                queue: 'beneficiario_consulta_queue',
                routingKey: 'beneficiario.update',
            },
            {
                exchange: 'boleto_cnab_emitir_exchange',
                queue: 'boleto_cnab_emitir_queue',
                routingKey: 'boleto_cnab.create',
            }
        ];
    }
}
