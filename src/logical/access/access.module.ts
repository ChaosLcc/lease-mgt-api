import { Module } from '@nestjs/common'
import { AccessService } from './access.service'
import { AccessController } from './access.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Access } from './entities/access.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Access])],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
