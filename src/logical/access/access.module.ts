import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';

@Module({
  controllers: [AccessController],
  providers: [AccessService]
})
export class AccessModule {}
