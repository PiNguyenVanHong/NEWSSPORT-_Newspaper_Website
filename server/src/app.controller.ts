import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './helpers/storage.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('uploads')
  @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {
      file
    }
  }
}
