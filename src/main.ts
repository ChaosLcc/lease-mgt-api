import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as express from 'express'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { HttpExceptionFilter } from './filter/http-exception.filter'
import { AnyExceptionFilter } from './filter/any-exception.filter'
import { Logger } from './utils/log4js'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const listenPort = 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('lease-mgr')
  // For parsing application/json
  app.use(express.json())
  // For parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }))
  // 使用拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor())
  // 过滤处理 HTTP 异常
  // AnyExceptionsFilter 要在 HttpExceptionFilter 的上面，否则 HttpExceptionFilter 就不生效了，全被 AnyExceptionsFilter 捕获了
  app.useGlobalFilters(new AnyExceptionFilter())
  app.useGlobalFilters(new HttpExceptionFilter())

  // 配置swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Lease Management')
    .setDescription('The Lease Management API Document')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-doc', app, document)

  await app.listen(listenPort)
}

bootstrap().then(() => {
  Logger.log(`
  listen in http://localhost:${listenPort}
  Swagger API in http://localhost:${listenPort}/api-doc`)
})
