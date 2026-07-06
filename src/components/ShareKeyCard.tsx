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
      className="rounded-[2.5rem] border border-purple-200 bg-purple-50/85 p-6 shadow-[0_18px_40px_rgba(124,58,237,0.12)]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-700">Success</p>
      <h3 className="mt-3 text-xl font-semibold text-slate-950">Content Dropped Successfully</h3>
      <div className="mt-4 rounded-[2rem] border border-purple-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Share key</p>
        <p className="mt-4 text-5xl font-bold tracking-[0.16em] text-slate-950">{shareKey}</p>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-purple-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
        >
          <Copy className="h-4 w-4" /> {copied ? 'Copied ✓' : 'Copy'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
        >
          <RotateCcw className="h-4 w-4" /> Drop Another
        </button>
      </div>
    </motion.section>
  );
}
