export interface Validation {
  validate: (input: ValidationDto.Input) => Record<string, string[]> | undefined
}

export namespace ValidationDto {
  export type Input = Record<string, any>
}
