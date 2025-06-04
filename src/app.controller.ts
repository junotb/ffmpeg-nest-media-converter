import { Response } from 'express';
import { Controller, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('convert/webm-to-mp4')
  @UseInterceptors(FileInterceptor('file'))
  async convertWebmToMp4(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ) {
    const filenameWithoutExtension = file.originalname.includes('.')
      ? file.originalname.substring(0, file.originalname.lastIndexOf('.'))
      : file.originalname;

    const mp4Buffer = await this.appService.convertWebmToMp4({
      buffer: file.buffer,
    });

    res.set({
      'Content-Type': 'video/mp4',
      'Content-Disposition': `attachment; filename="${filenameWithoutExtension}.mp4"`,
    });

    res.send(mp4Buffer);
  }

  @Post('convert/mp4-to-webm')
  @UseInterceptors(FileInterceptor('file'))
  async convertMp4ToWebm(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ) {
    const filenameWithoutExtension = file.originalname.includes('.')
      ? file.originalname.substring(0, file.originalname.lastIndexOf('.'))
      : file.originalname;

    const webmBuffer = await this.appService.convertMp4ToWebm({
      buffer: file.buffer,
    });

    res.set({
      'Content-Type': 'video/webm',
      'Content-Disposition': `attachment; filename="${filenameWithoutExtension}.webm"`,
    });

    res.send(webmBuffer);
  }
}
