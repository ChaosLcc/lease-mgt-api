import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Logger } from '../utils/log4js'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req
    return next.handle().pipe(
      map((data) => {
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    User: ${JSON.stringify(req.user)}
    Response data:\n ${JSON.stringify(data)}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`
        Logger.info(logFormat)
        Logger.access(logFormat)
        if (data) {
          if (Object.keys(data).indexOf('affected') !== -1) {
            return { code: 0, msg: 'success' }
          } else {
            if (Object.keys(data).indexOf('code') === -1) {
              return {
                code: 0,
                data: data,
                msg: 'success',
              }
            } else {
              return {
                code: data.code,
                data: data.data ?? {},
                msg: data.msg || 'success',
              }
            }
          }
        } else {
          return data
        }
      }),
    )
  }
}
