import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCodeDto } from '@/modules/codes/dto/create-code.dto';
import { UpdateCodeDto } from '@/modules/codes/dto/update-code.dto';
import { CodesService } from '@/modules/codes/codes.service';

@Controller('codes')
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

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
    return this.codesService.remove(id);
  }
}
