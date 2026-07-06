export function downloadDataUrl(dataUrl: string, fileName: string) {
  const anchor = document.createElement('a');
  anchor.href = dataUrl;
  anchor.download = fileName;
  anchor.click();
}
