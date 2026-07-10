import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Paperclip, Send } from 'lucide-react';
import { useToast } from './ToastProvider';

type UploadCardProps = {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
};

type FormValues = {
  message: string;
};

const MAX_TOTAL_FILE_SIZE = 50 * 1024 * 1024;

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
  const toast = useToast();
  
  // Get the register result for the message field
  const messageRegister = register('message');
  
  // Enable button if: text is non-empty (after trim) OR files are selected
  // Disable only when both text is empty AND no files selected
  const hasText = (message ?? '').trim().length > 0;
  const hasFiles = files.length > 0;
  const isSubmitEnabled = hasText || hasFiles;

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [message]);

  const handleFiles = (incoming: FileList | File[]) => {
    const addedFiles = Array.from(incoming).filter(
      (file) => !files.some((existing) => existing.name === file.name && existing.size === file.size),
    );

    if (!addedFiles.length) {
      return;
    }

    const totalSize = files.reduce((sum, file) => sum + file.size, 0) + addedFiles.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > MAX_TOTAL_FILE_SIZE) {
      toast.showToast('Too much to drop! Keep the total upload under 50 MB.', 'error');
      return;
    }

    setFiles((current) => [...current, ...addedFiles]);
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
      className="rounded-[1.25rem] border border-[#27272A] bg-[#111111] p-5 shadow-[0_12px_30px_rgba(2,6,23,0.6)] transition-transform duration-200 hover:-translate-y-1"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7C3AED]">Drop</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Drop files, text, or both</h2>
          <p className="mt-2 text-sm text-slate-400">Type a note, paste text, or attach files.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
        <div
          className={`rounded-[1.25rem] border p-1 transition-all duration-200 ${
            dragActive ? 'border-[#7C3AED] bg-[#0f0710] shadow-[0_0_0_6px_rgba(124,58,237,0.08)]' : 'border-[#27272A] bg-[#0b0b0b]'
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
            rows={4}
            name={messageRegister.name}
            onChange={messageRegister.onChange}
            onBlur={messageRegister.onBlur}
            ref={(element) => {
              // Call react-hook-form's ref handler
              messageRegister.ref(element);
              // Also store for auto-height effect
              textareaRef.current = element;
            }}
            className="min-h-[9rem] w-full resize-none rounded-[1.5rem] border-0 bg-[#0b0b0b] px-4 py-4 text-[15px] leading-7 text-white outline-none transition placeholder:text-slate-500 focus:ring-2 focus:ring-[#7C3AED]/30"
            placeholder="Drop your message..."
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 rounded-[1.25rem] border border-[#27272A] bg-[#0b0b0b] p-2.5">
            {selectedFiles.map((file, index) => (
              <div key={`${file.name}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#111111] px-3 py-1.5 text-sm text-slate-300 shadow-sm">
                <span className="max-w-[11rem] truncate">{file.name}</span>
                <button type="button" onClick={() => removeFile(index)} className="text-slate-400 transition hover:text-slate-700">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 rounded-[1.25rem] border border-[#27272A] bg-[#111111] p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
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
              className="inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#0b0b0b] px-3.5 py-2 text-sm font-medium text-slate-300 transition duration-200 hover:border-[#7C3AED] hover:bg-[#0f0710] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
            >
              <Paperclip className="h-4 w-4" aria-hidden="true" />
              Attach file
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isSubmitEnabled}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 sm:w-auto ${
              isSubmitEnabled
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#6d28d9] shadow-[0_12px_32px_rgba(124,58,237,0.22)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 active:translate-y-0'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
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
