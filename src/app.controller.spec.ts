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

    const mockRes = {
      set: jest.fn(),
      send: jest.fn(),
    } as any

    (appService.convertWebmToMp4 as jest.Mock).mockResolvedValue(expectedResult);

    await appController.convertWebmToMp4(mockFile, mockRes);

    expect(appService.convertWebmToMp4).toHaveBeenCalledWith({
      buffer: mockFile.buffer,
    });

    const filenameWithoutExtension = mockFile.originalname.includes('.')
      ? mockFile.originalname.substring(0, mockFile.originalname.lastIndexOf('.'))
      : mockFile.originalname;

    expect(mockRes.set).toHaveBeenCalledWith({
      'Content-Type': 'video/mp4',
      'Content-Disposition': `attachment; filename="${filenameWithoutExtension}.mp4"`,
    });

    expect(mockRes.send).toHaveBeenCalledWith(expectedResult);
  });

  it('should convert mp4 to webm', async () => {
    const mockFile = {
      originalname: 'test.mp4',
      buffer: Buffer.from('dummy mp4 data'),
    } as Express.Multer.File;

    const expectedResult = Buffer.from('converted webm');
    const mockRes = {
      set: jest.fn(),
      send: jest.fn(),
    } as any;

    (appService.convertMp4ToWebm as jest.Mock).mockResolvedValue(expectedResult);

    await appController.convertMp4ToWebm(mockFile, mockRes);

    expect(appService.convertMp4ToWebm).toHaveBeenCalledWith({
      buffer: mockFile.buffer,
    });

    const filenameWithoutExtension = mockFile.originalname.includes('.')
      ? mockFile.originalname.substring(0, mockFile.originalname.lastIndexOf('.'))
      : mockFile.originalname;

    expect(mockRes.set).toHaveBeenCalledWith({
      'Content-Type': 'video/webm',
      'Content-Disposition': `attachment; filename="${filenameWithoutExtension}.webm"`,
    });

    expect(mockRes.send).toHaveBeenCalledWith(expectedResult);
  });
});
