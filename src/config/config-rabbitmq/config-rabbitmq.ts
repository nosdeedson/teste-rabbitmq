import { ClientsModuleOptions, MicroserviceOptions, Transport } from "@nestjs/microservices";

export abstract class ConfigRabbitmq {

    static connectMicroservice(queueName: string, durable: boolean): MicroserviceOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
                queue: queueName,
                queueOptions: {
                    durable: durable,
                }
            }
        }
    }

    static register(queueName: string): ClientsModuleOptions {
        return [
            {
                name: 'RABBITMQ_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://rabbitmq:rabbitmq@localhost:5672'],
                    queue: queueName,
                    queueOptions: {
                        durable: false,
                    }
                }
            }
        ]
    }

}
