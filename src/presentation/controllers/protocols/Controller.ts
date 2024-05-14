import { type HttpResponse } from '@/presentation/controllers/protocols/HttpResponse'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse >
}
