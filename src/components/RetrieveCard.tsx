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
      className="rounded-[2.25rem] border border-slate-200/80 bg-white p-5 shadow-[0_16px_48px_rgba(15,23,42,0.06)]"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-700">Retrieve Content</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Enter your 4-digit Drop Key</h2>
        </div>
        <Key className="h-8 w-8 text-purple-700" aria-hidden="true" />
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 text-center">
          <input
            id="dropKey"
            type="text"
            inputMode="numeric"
            maxLength={4}
            autoComplete="one-time-code"
            className="mx-auto block w-full max-w-xs rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center text-3xl font-semibold tracking-[0.42em] text-slate-950 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
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
          className="inline-flex w-full items-center justify-center rounded-full bg-purple-700 px-6 py-3 text-base font-semibold text-white transition duration-200 hover:bg-purple-800 hover:shadow-[0_12px_32px_rgba(124,58,237,0.24)] focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLoading ? 'Retrieving…' : 'Retrieve →'}
        </button>
      </form>
    </motion.div>
  );
}
