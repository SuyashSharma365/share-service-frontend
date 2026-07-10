import { ArrowUpRight, Download, FileText, ImageIcon } from 'lucide-react';
import { downloadDataUrl } from '../lib/download';
import { buildFilePreview } from '../lib/utils';

type ContentPreviewProps = {
  message?: string;
  data?: string;
};

export default function ContentPreview({ message, data }: ContentPreviewProps) {
  const preview = data ? buildFilePreview(data) : null;

  return (
    <section className="rounded-[1.5rem] border border-[#27272A] bg-[#111111] p-6 shadow-[0_18px_36px_rgba(2,6,23,0.6)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7C3AED]">Retrieved content</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Shared content preview</h2>
        </div>
        <ArrowUpRight className="h-6 w-6 text-[#7C3AED]" aria-hidden="true" />
      </div>

      {message && (
        <div className="mt-6 rounded-3xl border border-[#27272A] bg-[#0b0b0b] p-5 text-slate-300">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Message</p>
          <p className="mt-3 whitespace-pre-line text-base leading-7">{message}</p>
        </div>
      )}

      {preview ? (
        <div className="mt-6 rounded-3xl border border-[#27272A] bg-[#0b0b0b] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">File preview</p>
              <p className="mt-2 text-base font-semibold text-white">{preview.fileName}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => downloadDataUrl(preview.dataUrl, preview.fileName)}
                className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6d28d9]"
              >
                <Download className="h-4 w-4" /> Download
              </button>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#0b0b0b] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-400"
                href={preview.dataUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FileText className="h-4 w-4" /> Open
              </a>
            </div>
          </div>
          <div className="mt-5 rounded-3xl border border-[#27272A] bg-[#0b0b0b] p-5">
            {preview.mimeType.startsWith('image/') ? (
              <img src={preview.dataUrl} alt="Retrieved visual content" className="rounded-3xl object-cover" />
            ) : preview.mimeType === 'application/pdf' ? (
              <iframe src={preview.dataUrl} title="PDF preview" className="h-[420px] w-full rounded-3xl" />
            ) : preview.mimeType.startsWith('video/') ? (
              <video controls className="h-[420px] w-full rounded-3xl bg-slate-950">
                <source src={preview.dataUrl} type={preview.mimeType} />
                Your browser does not support video playback.
              </video>
              ) : preview.isTextPreview ? (
              <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">{atob(data ?? '')}</pre>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[#27272A] bg-[#0b0b0b] p-8 text-slate-400">
                <ImageIcon className="h-8 w-8" />
                <p className="text-sm">File preview is not available for this format.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-[#27272A] bg-[#0b0b0b] p-6 text-slate-400">
          <p className="text-sm">No file data available. Enter a key to retrieve text or file content.</p>
        </div>
      )}
    </section>
  );
}
