import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Code } from '@/modules/codes/entities/code.entity';
import { CodesController } from '@/modules/codes/codes.controller';
import { CodesService } from '@/modules/codes/codes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Code])
  ],
  controllers: [CodesController],
  providers: [CodesService],
  exports: [CodesService],
})
export class CodesModule {}
