import { CpfError } from '@/domain/account/error/CpfError';

export default class Cpf {
  private readonly FACTOR_FIRST_DIGIT = 10;
  private readonly FACTOR_SECOND_DIGIT = 11;
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValid(value);
    this.value = value;
  }

  private ensureIsValid(value: string): void {
    if (!this.validate(value)) {
      throw CpfError.invalid(value);
    }
  }

  private validate(rawCpf: string): boolean {
    if (rawCpf === '') return false;
    const cpf = this.removeNonDigits(rawCpf);
    if (!this.isValidLength(cpf)) return false;
    if (this.allDigitsEqual(cpf)) return false;
    const firstDigit = this.calculateDigit(cpf, this.FACTOR_FIRST_DIGIT);
    const secondDigit = this.calculateDigit(cpf, this.FACTOR_SECOND_DIGIT);
    return this.extractDigit(cpf) === `${firstDigit}${secondDigit}`;
  }

  private removeNonDigits(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  private isValidLength(cpf: string): boolean {
    return cpf.length === 11;
  }

  private allDigitsEqual(cpf: string): boolean {
    const [firstDigit] = cpf;
    return cpf.split('').every((digit) => digit === firstDigit);
  }

  private calculateDigit(cpf: string, factor: number): number {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  private extractDigit(cpf: string): string {
    return cpf.slice(9);
  }
}
