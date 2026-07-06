import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Paperclip, Send } from 'lucide-react';

type UploadCardProps = {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
};

type FormValues = {
  message: string;
};

export default function UploadCard({ onSubmit, isLoading }: UploadCardProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { message: '' } });

  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const message = watch('message');
  const hasContent = Boolean(message?.trim() || files.length);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [message]);

  const handleFiles = (incoming: FileList | File[]) => {
    const addedFiles = Array.from(incoming).filter((file) => !files.some((existing) => existing.name === file.name && existing.size === file.size));
    if (addedFiles.length) {
      setFiles((current) => [...current, ...addedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((current) => current.filter((_, idx) => idx !== index));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files.length) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const openFileDialog = () => {
    document.querySelector<HTMLInputElement>('#upload-file')?.click();
  };

  const submitForm = (values: FormValues) => {
    const formData = new FormData();
    if (values.message?.trim()) {
      formData.append('message', values.message.trim());
    }
    files.forEach((file) => formData.append('file', file));
    onSubmit(formData);
    reset();
    setFiles([]);
  };

  const selectedFiles = useMemo(() => files, [files]);

  return (
    <motion.div
      className="rounded-[2.5rem] border border-slate-200 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mb-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-700">Drop</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Drop files, text, or both</h2>
          <p className="mt-2 text-sm text-slate-600">Type a note, paste text, or attach files.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
        <div
          className={`rounded-[2rem] border p-1 transition ${
            dragActive ? 'border-purple-400 bg-purple-50' : 'border-slate-200 bg-slate-50'
          }`}
          onDragEnter={() => setDragActive(true)}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          aria-label="Drop content area"
        >
          <textarea
            id="message"
            ref={textareaRef}
            rows={4}
            className="min-h-[10rem] w-full resize-none rounded-[1.75rem] border-0 bg-white px-5 py-5 text-base leading-7 text-slate-900 outline-none transition focus:ring-2 focus:ring-purple-200"
            placeholder="Drop your message... Type a note, paste text, or attach files."
            {...register('message')}
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-3 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-3">
            {selectedFiles.map((file, index) => (
              <div key={`${file.name}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                <span>{file.name}</span>
                <button type="button" onClick={() => removeFile(index)} className="text-slate-400 transition hover:text-slate-700">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <input
              id="upload-file"
              type="file"
              multiple
              className="hidden"
              onChange={(event) => {
                if (event.target.files) {
                  handleFiles(event.target.files);
                }
              }}
            />
            <button
              type="button"
              onClick={openFileDialog}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-purple-300 hover:bg-purple-50 hover:text-slate-900"
            >
              <Paperclip className="h-4 w-4" aria-hidden="true" />
              Attach file
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !hasContent}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition sm:w-auto ${
              hasContent
                ? 'bg-gradient-to-r from-purple-700 to-violet-600 shadow-[0_15px_40px_rgba(124,58,237,0.32)] hover:from-purple-800 hover:to-violet-700'
                : 'bg-slate-300 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Send className="h-4 w-4" />
            {isLoading ? 'Dropping…' : 'Drop Content →'}
          </button>
        </div>

        {errors.message && <p className="text-sm text-red-600">Please provide valid text.</p>}
      </form>
    </motion.div>
  );
}
