export default class DomainError extends Error {
  output (): Output {
    return {
      message: this.message
    }
  }
}

type Output = {
  message: string
}
