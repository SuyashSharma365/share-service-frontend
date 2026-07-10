import { motion } from 'framer-motion';
import { Copy, RotateCcw } from 'lucide-react';
import { useState } from 'react';

type ShareKeyCardProps = {
  shareKey: string;
  onCopy: () => void;
  onReset: () => void;
};

export default function ShareKeyCard({ shareKey, onCopy, onReset }: ShareKeyCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      className="rounded-[1.75rem] border border-[#27272A] bg-[#111111] p-6 shadow-[0_16px_36px_rgba(2,6,23,0.6)]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7C3AED]">Success</p>
      <h3 className="mt-3 text-xl font-semibold text-white">Content Dropped Successfully</h3>
      <div className="mt-4 rounded-[1.25rem] border border-[#27272A] bg-[#0b0b0b] p-6 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Share key</p>
        <p className="mt-4 text-5xl font-bold tracking-[0.16em] text-white">{shareKey}</p>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6d28d9]"
        >
          <Copy className="h-4 w-4" /> {copied ? 'Copied ✓' : 'Copy'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#27272A] bg-[#0b0b0b] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-400"
        >
          <RotateCcw className="h-4 w-4" /> Drop Another
        </button>
      </div>
    </motion.section>
  );
}
