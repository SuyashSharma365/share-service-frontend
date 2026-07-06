import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Key } from 'lucide-react';

type RetrieveCardProps = {
  onRetrieve: (key: string) => void;
  isLoading: boolean;
};

type FormValues = {
  dropKey: string;
};

export default function RetrieveCard({ onRetrieve, isLoading }: RetrieveCardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { dropKey: '' } });

  const submitForm = (values: FormValues) => {
    onRetrieve(values.dropKey);
  };

  return (
    <motion.div
      className="rounded-[2.5rem] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-700">Retrieve Content</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Enter your 4-digit Drop Key</h2>
        </div>
        <Key className="h-8 w-8 text-purple-700" aria-hidden="true" />
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 text-center">
          <input
            id="dropKey"
            type="text"
            inputMode="numeric"
            maxLength={4}
            autoComplete="one-time-code"
            className="mx-auto block w-full max-w-xs rounded-3xl border border-slate-200 bg-white px-6 py-5 text-center text-4xl font-semibold tracking-[0.42em] text-slate-950 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            placeholder="____"
            {...register('dropKey', {
              required: 'Enter your 4-digit key',
              pattern: {
                value: /^\d{4}$/,
                message: 'Key must be exactly 4 digits',
              },
            })}
          />
          {errors.dropKey && <p className="mt-3 text-sm text-red-600">{errors.dropKey.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-full bg-purple-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLoading ? 'Retrieving…' : 'Retrieve →'}
        </button>
      </form>
    </motion.div>
  );
}
