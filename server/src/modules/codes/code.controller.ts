import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCodeDto } from '@/modules/codes/dto/create-code.dto';
import { UpdateCodeDto } from '@/modules/codes/dto/update-code.dto';
import { CodeService } from '@/modules/codes/code.service';

@Controller('codes')
export class CodeController {
  constructor(private readonly codesService: CodeService) {}

  @Post()
  create(@Body() createCodeDto: CreateCodeDto) {
    return this.codesService.create(createCodeDto);
  }

  @Get()
  findAll() {
    return this.codesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto) {
    return this.codesService.update(+id, updateCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codesService.remove(+id);
  }
}
