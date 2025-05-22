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
    await new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .inputFormat('webm')
        .outputOptions(['-c:v libx264', '-c:a aac'])
        .format('mp4')
        .save(outputPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });

    // 변환된 파일 읽고 삭제
    const outputBuffer = await readFile(outputPath);
    await unlink(inputPath);
    await unlink(outputPath);

    return outputBuffer;
  }

  async convertMp4ToWebm({
    buffer,
  }: ConvertDto): Promise<Buffer> {
    const inputPath = join(tmpdir(), `${randomUUID()}.mp4`);
    const outputPath = inputPath.replace(/\.mp4$/, '.webm');

    // 원본 파일 저장
    await writeFile(inputPath, buffer);

    // webm 변환
    await new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .inputFormat('mp4')
        .outputOptions(['-c:v libvpx', '-c:a libvorbis', '-b:a 128k'])
        .format('webm')
        .save(outputPath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err))
    });

    // 변환된 파일 읽고 삭제
    const outputBuffer = await readFile(outputPath);
    await unlink(inputPath);
    await unlink(outputPath);

    return outputBuffer;
  }
}
