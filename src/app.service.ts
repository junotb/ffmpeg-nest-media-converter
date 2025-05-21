import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { join } from 'path';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

@Injectable()
export class AppService {
  async convertWebmToMp4(
    inputFilename: string,
    outputFilename: string,
  ): Promise<void> {
    const inputFilepath = join(process.cwd(), 'inputs', inputFilename);
    const outputFilepath = join(process.cwd(), 'outputs', outputFilename);

    return new Promise((resolve, reject) => {
      ffmpeg(inputFilepath)
        .outputOptions([
          '-c:v libx264', // 비디오 코덱
          '-preset slow', // 인코딩 속도 (slow, medium, fast)
          '-crf 20', // 비디오 품질 (0-51, 낮을수록 품질 좋음)
          '-r 30', // 프레임 레이트 (초당 프레임 수)
          '-c:a aac', // 오디오 코덱
          '-b:a 128k', // 오디오 비트레이트
          '-movflags +faststart', // MP4 파일 최적화
        ])
        .format('mp4')
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .save(outputFilepath);
    });
  }

  async convertMp4ToWebm(
    inputFilename: string,
    outputFilename: string,
  ): Promise<void> {
    const inputFilepath = join(__dirname, '..', 'inputs', inputFilename);
    const outputFilepath = join(__dirname, '..', 'outputs', outputFilename);

    return new Promise((resolve, reject) => {
      ffmpeg(inputFilepath)
        .outputOptions([
          '-c:v libvpx', // 비디오 코덱
          '-crf 30', // 비디오 품질 (0-63, 낮을수록 품질 좋음)
          '-b:v 1M', // 비디오 비트레이트
          '-c:a libvorbis', // 오디오 코덱
          '-b:a 128k', // 오디오 비트레이트
        ])
        .format('webm')
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
        .save(outputFilepath);
    });
  }
}
