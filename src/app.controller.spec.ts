import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should convert webm to mp4', async () => {
      const outputFilePath = join(process.cwd(), 'outputs', 'output.mp4');
      await appController.convertWebmToMp4();
      expect(existsSync(outputFilePath)).toBe(true);
      unlinkSync(outputFilePath);
    });
    it('should convert mp4 to webm', async () => {
      const outputFilePath = join(process.cwd(), 'outputs', 'output.webm');
      await appController.convertMp4ToWebm();
      expect(existsSync(outputFilePath)).toBe(true);
      unlinkSync(outputFilePath);
    });
  });
});
