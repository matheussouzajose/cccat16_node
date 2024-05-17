export interface Validation {
  validate: (input: ValidationDto.Input) => ValidationDto.Output[] | undefined
}

export namespace ValidationDto {
  export type Input = Record<string, any>
  export type Output = { detail: string, pointer: string }
}
