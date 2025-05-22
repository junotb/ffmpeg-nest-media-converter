import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('convert/webm-to-mp4')
  @UseInterceptors(FileInterceptor('file'))
  async convertWebmToMp4(@UploadedFile() file: Express.Multer.File) {
    return this.appService.convertWebmToMp4({
      buffer: file.buffer,
    });
  }

  @Post('convert/mp4-to-webm')
  @UseInterceptors(FileInterceptor('file'))
  async convertMp4ToWebm(@UploadedFile() file: Express.Multer.File) {
    return this.appService.convertMp4ToWebm({
      buffer: file.buffer,
    });
  }
}
