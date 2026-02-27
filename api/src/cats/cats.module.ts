import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './controllers/cats.controller';

@Module({
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
