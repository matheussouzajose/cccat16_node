export default interface HttpServer {
  register: (method: string, url: string, callback: Function, middlewares: Function[]) => void
  listen: (port: number) => void
  addMiddleware: (callback: Function) => void
}
