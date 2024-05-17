export default interface MailerGateway {
  send: (recipient: string, subject: string, content: string) => Promise<void>;
}
