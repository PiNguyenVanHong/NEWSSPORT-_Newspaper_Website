import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Code } from '@/modules/codes/entities/code.entity';
import { CodeController } from '@/modules/codes/code.controller';
import { CodeService } from '@/modules/codes/code.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Code])
  ],
  controllers: [CodeController],
  providers: [CodeService],
  exports: [CodeService],
})
export class CodeModule {}
