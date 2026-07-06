const MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/bmp": "bmp",
  "application/pdf": "pdf",
  "application/zip": "zip",
  "application/x-rar-compressed": "rar",
  "application/x-7z-compressed": "7z",
  "application/gzip": "gz",
  "video/mp4": "mp4",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/ogg": "ogg",
  "text/plain": "txt",
  "application/json": "json",
};

export function detectMimeFromBytes(bytes: Uint8Array): string | undefined {
  if (bytes.length < 4) return undefined;

  // JPEG
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    return "image/jpeg";
  }

  // PNG
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }

  // GIF
  if (
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38
  ) {
    return "image/gif";
  }

  // WebP
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }

  // BMP
  if (bytes[0] === 0x42 && bytes[1] === 0x4d) {
    return "image/bmp";
  }

  // PDF
  if (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46
  ) {
    return "application/pdf";
  }

  // ZIP
  if (
    bytes[0] === 0x50 &&
    bytes[1] === 0x4b &&
    ((bytes[2] === 0x03 && bytes[3] === 0x04) ||
      (bytes[2] === 0x05 && bytes[3] === 0x06) ||
      (bytes[2] === 0x07 && bytes[3] === 0x08))
  ) {
    return "application/zip";
  }

  // RAR
  if (
    bytes.length >= 7 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x61 &&
    bytes[2] === 0x72 &&
    bytes[3] === 0x21 &&
    bytes[4] === 0x1a &&
    bytes[5] === 0x07
  ) {
    return "application/x-rar-compressed";
  }

  // 7z
  if (
    bytes.length >= 6 &&
    bytes[0] === 0x37 &&
    bytes[1] === 0x7a &&
    bytes[2] === 0xbc &&
    bytes[3] === 0xaf &&
    bytes[4] === 0x27 &&
    bytes[5] === 0x1c
  ) {
    return "application/x-7z-compressed";
  }

  // GZIP
  if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
    return "application/gzip";
  }

  // MP4
  if (
    bytes.length >= 12 &&
    bytes[4] === 0x66 &&
    bytes[5] === 0x74 &&
    bytes[6] === 0x79 &&
    bytes[7] === 0x70
  ) {
    return "video/mp4";
  }

  // MP3 (ID3)
  if (
    bytes[0] === 0x49 &&
    bytes[1] === 0x44 &&
    bytes[2] === 0x33
  ) {
    return "audio/mpeg";
  }

  // MP3 (Frame Sync)
  if (
    bytes[0] === 0xff &&
    (bytes[1] & 0xe0) === 0xe0
  ) {
    return "audio/mpeg";
  }

  // WAV
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x41 &&
    bytes[10] === 0x56 &&
    bytes[11] === 0x45
  ) {
    return "audio/wav";
  }

  // OGG
  if (
    bytes[0] === 0x4f &&
    bytes[1] === 0x67 &&
    bytes[2] === 0x67 &&
    bytes[3] === 0x53
  ) {
    return "audio/ogg";
  }

  // JSON
  try {
    const text = new TextDecoder().decode(bytes.slice(0, 2048)).trim();
    if (text.startsWith("{") || text.startsWith("[")) {
      JSON.parse(text);
      return "application/json";
    }
  } catch {}

  // Plain text
  if (looksLikeText(bytes)) {
    return "text/plain";
  }

  return undefined;
}

function looksLikeText(bytes: Uint8Array): boolean {
  const length = Math.min(bytes.length, 4096);

  for (let i = 0; i < length; i++) {
    const b = bytes[i];

    if (
      b === 9 || // tab
      b === 10 || // newline
      b === 13 || // carriage return
      (b >= 32 && b <= 126)
    ) {
      continue;
    }

    return false;
  }

  return true;
}

function getFileExtension(mimeType: string): string {
  return MIME_TO_EXTENSION[mimeType] ?? "bin";
}

export function buildFilePreview(base64: string) {
  const cleanBase64 = base64.trim();

  let binary: Uint8Array;

  try {
    binary = Uint8Array.from(
      atob(cleanBase64),
      (c) => c.charCodeAt(0)
    );
  } catch {
    throw new Error("Invalid Base64 data");
  }

  const mimeType =
    detectMimeFromBytes(binary) ?? "application/octet-stream";

  return {
    dataUrl: `data:${mimeType};base64,${cleanBase64}`,
    mimeType,
    fileName: `shared-file.${getFileExtension(mimeType)}`,
    isTextPreview:
      mimeType.startsWith("text/") ||
      mimeType === "application/json",
  };
}