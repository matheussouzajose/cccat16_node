import type { Controller } from '@/presentation/controllers/protocols/Controller'
import type { Request, Response } from 'express'

export default class ExpressRouteAdapter {
  static adaptRoute (controller: Controller) {
    return async (req: Request, res: Response): Promise<void> => {
      const request = {
        ...(req.body || {}),
        ...(req.params || {}),
        accountId: req.accountId
      }
      const httpResponse = await controller.handle(request)
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 500) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message
        })
      }
    }
  }
}
