import type MailerGateway from '@/application/protocols/gateway/MailerGateway';

export default class MailerGatewayConsole implements MailerGateway {
  async send(
    recipient: string,
    subject: string,
    content: string,
  ): Promise<void> {
    console.log({ recipient, subject, content });
  }
}
