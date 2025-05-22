import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const mockAppService = {
      convertWebmToMp4: jest.fn(),
      convertMp4ToWebm: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should convert webm to mp4', async () => {
    const mockFile = {
      originalname: 'test.webm',
      buffer: Buffer.from('dummy webm data'),
    } as Express.Multer.File;

    const expectedResult = Buffer.from('converted mp4');
    (appService.convertWebmToMp4 as jest.Mock).mockResolvedValue(expectedResult);

    const result = await appController.convertWebmToMp4(mockFile);

    expect(appService.convertWebmToMp4).toHaveBeenCalledWith({
      filename: mockFile.originalname,
      buffer: mockFile.buffer,
    });
    expect(result).toBe(expectedResult);
  });

  it('should convert mp4 to webm', async () => {
    const mockFile = {
      originalname: 'test.mp4',
      buffer: Buffer.from('dummy mp4 data'),
    } as Express.Multer.File;

    const expectedResult = Buffer.from('converted webm');
    (appService.convertMp4ToWebm as jest.Mock).mockResolvedValue(expectedResult);

    const result = await appController.convertMp4ToWebm(mockFile);

    expect(appService.convertMp4ToWebm).toHaveBeenCalledWith({
      filename: mockFile.originalname,
      buffer: mockFile.buffer,
    });
    expect(result).toBe(expectedResult);
  });
});
