# NestJS Video Converter (WebM <-> MP4)

NestJS 기반 영상 변환 API입니다.  
FFmpeg을 활용하여 WebM ↔ MP4 포맷 간 변환을 수행합니다.

## 주요 기능

- WebM → MP4 변환 (`libx264`, `aac`)
- MP4 → WebM 변환 (`libvpx`, `libvorbis`)
- FFmpeg 내장 바이너리 사용 (`@ffmpeg-installer/ffmpeg`)

## 기술 스택

- [NestJS](https://nestjs.com/)
- [FFmpeg](https://ffmpeg.org/)
- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)
- [@ffmpeg-installer/ffmpeg](https://github.com/eugeneware/ffmpeg-installer)

## 디렉토리 구조

```
ffmpeg-nest-media-converter/
├── inputs/ # 변환할 원본 영상 폴더
│ ├── input.webm
│ └── input.mp4
├── outputs/ # 변환된 결과 영상 저장 폴더
│ ├── output.webm
│ └── output.mp4
├── src/
│ ├── app.controller.spec.ts # HTTP 엔드포인트 테스트
│ ├── app.controller.ts # HTTP 엔드포인트 정의
│ ├── app.module.ts # NestJS 모듈 정의
│ ├── app.service.ts # FFmpeg 변환 로직
│ └── main.ts # NestJS 애플리케이션 진입점
├── NOTICE.txt # 라이선스 및 코덱 고지
└── README.md
```

## 사용 방법

### WebM → MP4

1. `inputs/input.webm` 파일 준비
2. `GET /convert-webm-to-mp4` 호출
3. 결과: `outputs/output.mp4`

### MP4 → WebM

1. `inputs/input.mp4` 파일 준비
2. `GET /convert-mp4-to-webm` 호출
3. 결과: `outputs/output.webm`

> 파일명은 고정되어 있습니다.
> (추후 확장 가능)

