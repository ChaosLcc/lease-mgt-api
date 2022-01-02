import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggerMiddleware } from './middleware/logger.middleware'
import { UserModule } from './logical/user/user.module'
import { AuthModule } from './logical/auth/auth.module'
import { RoleModule } from './logical/role/role.module';
import { AccessModule } from './logical/access/access.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, RoleModule, AccessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
