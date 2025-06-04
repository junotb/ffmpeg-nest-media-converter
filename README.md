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

```curl
curl -X POST http://localhost:3000/convert/webm-to-mp4 \
  -F "file=@./inputs/sample.webm" --output sample.mp4
```

### MP4 → WebM

```curl
curl -X POST http://localhost:3000/convert/mp4-to-webm \
  -F "file=@./inputs/sample.mp4" --output sample.webm
```

### 샘플 변환 페이지

브라우저에서 직접 파일을 업로드하고 변환 결과를 다운로드할 수 있는 **샘플 페이지**가 포함되어 있습니다.

```
/public/index.html
실행 시 접속: http://localhost:3000
```

이 페이지는 개발/테스트용이며, 실제 서비스 적용 시에는 보안 및 파일 검증 로직을 추가해야 합니다.
