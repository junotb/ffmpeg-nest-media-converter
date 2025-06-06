import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { tmpdir } from 'os';
import { join } from 'path';
import { readFile, unlink, writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

interface ConvertDto {
  buffer: Buffer;
}

@Injectable()
export class AppService {
  async convertWebmToMp4({
    buffer,
  }: ConvertDto): Promise<Buffer> {
    const inputPath = join(tmpdir(), `${randomUUID()}.webm`);
    const outputPath = inputPath.replace(/\.webm$/, '.mp4');

    // 원본 파일 저장
    await writeFile(inputPath, buffer);

    // mp4 변환
    try {
      await new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
          .inputFormat('webm')
          .outputOptions([
            '-c:v libx264', // 영상 인코딩
            '-c:a aac', // 오디오 인코딩
            '-b:a 128k', // 오디오 비트레이트
            '-movflags +faststart', // 파일 시작 부분에 moov atom 추가
          ])
          .format('mp4')
          .save(outputPath)
          .on('end', () => resolve())
          .on('error', (err) => reject(err));
      });

      const result = await readFile(outputPath);
      return result;
    } finally {
      await Promise.allSettled([
        unlink(inputPath),
        unlink(outputPath),
      ]);
    }
  }

  async convertMp4ToWebm({
    buffer,
  }: ConvertDto): Promise<Buffer> {
    const inputPath = join(tmpdir(), `${randomUUID()}.mp4`);
    const outputPath = inputPath.replace(/\.mp4$/, '.webm');

    // 원본 파일 저장
    await writeFile(inputPath, buffer);

    // webm 변환
    try {
      await new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
          .inputFormat('mp4')
          .outputOptions([
            '-c:v libvpx', // 영상 인코딩
            '-c:a libvorbis', // 오디오 인코딩
            '-b:a 128k', // 오디오 비트레이트
          ])
          .format('webm')
          .save(outputPath)
          .on('end', () => resolve())
          .on('error', (err) => reject(err))
      });

      const result = await readFile(outputPath);
      return result;
    } finally {
      await Promise.allSettled([
        unlink(inputPath),
        unlink(outputPath),
      ]);
    }
  }
}
