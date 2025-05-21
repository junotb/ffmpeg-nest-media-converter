import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('convert-webm-to-mp4')
  convertWebmToMp4() {
    const inputFilePath = 'input.webm';
    const outputFilePath = 'output.mp4';
    return this.appService.convertWebmToMp4(inputFilePath, outputFilePath);
  }

  @Get('convert-mp4-to-webm')
  convertMp4ToWebm() {
    const inputFilePath = 'input.mp4';
    const outputFilePath = 'output.webm';
    return this.appService.convertMp4ToWebm(inputFilePath, outputFilePath);
  }
}
