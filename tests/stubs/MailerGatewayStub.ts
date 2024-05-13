import type MailerGateway from '@/infrastructure/gateway/MailerGateway'

export default class MailerGatewayStub implements MailerGateway {
  recipient: string | undefined
  subject: string | undefined
  content: string | undefined
  async send (recipient: string, subject: string, content: string): Promise<void> {
    this.recipient = recipient
    this.subject = subject
    this.content = content
  }
}
