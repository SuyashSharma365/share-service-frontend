export function detectMimeFromBytes(bytes: Uint8Array) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'image/jpeg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png';
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return 'image/gif';
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return 'application/pdf';
  if (bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04) return 'application/zip';
  if (bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x00 && bytes[3] === 0x18) return 'video/mp4';
  if (bytes[0] === 0x25 && bytes[1] === 0x21) return 'text/plain';
  return undefined;
}

export function buildFilePreview(base64: string) {
  const cleanBase64 = base64.trim();
  const binary = Uint8Array.from(atob(cleanBase64), (character) => character.charCodeAt(0));
  const mimeType = detectMimeFromBytes(binary) ?? 'application/octet-stream';
  const extension = getFileExtension(mimeType);
  const dataUrl = `data:${mimeType};base64,${cleanBase64}`;

  return {
    dataUrl,
    mimeType,
    fileName: `shared-file.${extension}`,
    isTextPreview: mimeType.startsWith('text/') || mimeType.includes('json') || mimeType.includes('xml'),
  };
}

function getFileExtension(mimeType: string) {
  return mimeType === 'image/jpeg'
    ? 'jpg'
    : mimeType === 'image/png'
    ? 'png'
    : mimeType === 'image/gif'
    ? 'gif'
    : mimeType === 'application/pdf'
    ? 'pdf'
    : mimeType === 'application/zip'
    ? 'zip'
    : mimeType === 'text/plain'
    ? 'txt'
    : mimeType === 'application/json'
    ? 'json'
    : 'bin';
}
