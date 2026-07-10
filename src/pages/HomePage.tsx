import { useState } from 'react';
import { Lock, Zap, HardDrive } from 'lucide-react';
import Seo from '../components/Seo';
import UploadCard from '../components/UploadCard';
import RetrieveCard from '../components/RetrieveCard';
import ShareKeyCard from '../components/ShareKeyCard';
import ContentPreview from '../components/ContentPreview';
import { useToast } from '../components/ToastProvider';
import { useRetrieveContent, useUploadContent } from '../hooks/useDropCodeApi';

function HomePage() {
  const [shareKey, setShareKey] = useState<string | null>(null);
  const [retrievedContent, setRetrievedContent] = useState<{ message?: string; data?: string } | null>(null);
  const toast = useToast();
  const uploadMutation = useUploadContent();
  const retrieveMutation = useRetrieveContent();

  const handleUpload = async (formData: FormData) => {
    try {
      const result = await uploadMutation.mutateAsync(formData);
      const key = result.objectId ?? result.key;

      if (!key) {
        throw new Error('No share key returned.');
      }

      setShareKey(key);
      setRetrievedContent(null);
      toast.showToast('Drop complete. Your Drop Key is ready.', 'success');
    } catch (error) {
      toast.showToast('Drop failed. Please try again.', 'error');
    }
  };

  const handleRetrieve = async (key: string) => {
    try {
      const result = await retrieveMutation.mutateAsync(key);
      setRetrievedContent(result);
      toast.showToast('Content retrieved successfully.', 'success');
    } catch (error: any) {
      setRetrievedContent(null);
      const errorMessage =
        error?.response?.status === 404
          ? 'This Drop Key has expired or does not exist.'
          : 'Unable to retrieve content. Please check the key and try again.';
      toast.showToast(errorMessage, 'error');
    }
  };

  const resetUpload = () => {
    setShareKey(null);
    setRetrievedContent(null);
    uploadMutation.reset();
    retrieveMutation.reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <Seo
        title="DropCode | Anonymous file & text sharing"
        description="Share files or text securely with a simple 4-digit key. Fast. Private. Simple."
        path="/"
      />

      <section className="grid gap-6 xl:grid-cols-2 xl:items-stretch">
        <div className="rounded-[1.25rem] border bg-[#111111] border-[#27272A] p-6 shadow-[0_20px_40px_rgba(2,6,23,0.7)] xl:h-full xl:p-7">
          <div className="flex h-full flex-col justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7C3AED]">Drop Content</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Drop anything. Retrieve anywhere.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-[15px]">
                Share files or text securely using a simple 4-digit key. No login required.
              </p>
            </div>

            <div className="mt-2">
              {!shareKey ? (
                <UploadCard onSubmit={handleUpload} isLoading={uploadMutation.isPending} />
              ) : (
                <ShareKeyCard
                  shareKey={shareKey}
                  onCopy={() => navigator.clipboard.writeText(shareKey)}
                  onReset={resetUpload}
                />
              )}
            </div>
          </div>
        </div>

        <div className="rounded-[1.25rem] border bg-[#111111] border-[#27272A] p-6 shadow-[0_20px_40px_rgba(2,6,23,0.7)] xl:h-full xl:p-7">
          <div className="flex h-full flex-col justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#7C3AED]">Retrieve Content</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Enter your 4-digit Drop Key
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-[15px]">
                Quickly retrieve text, images, video, PDF, or downloads without leaving the screen.
              </p>
            </div>

            <div className="space-y-4">
              <RetrieveCard onRetrieve={handleRetrieve} isLoading={retrieveMutation.isPending} />
              {retrieveMutation.isPending ? (
                <div className="rounded-[1.75rem] border border-[#27272A] bg-[#0b0b0b] p-5">
                  <div className="space-y-3">
                    <div className="h-6 w-3/4 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-5 w-1/2 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-48 animate-pulse rounded-[1.25rem] bg-slate-200" />
                  </div>
                </div>
              ) : retrievedContent ? (
                <ContentPreview message={retrievedContent.message} data={retrievedContent.data} />
              ) : (
                  <div className="rounded-[1.75rem] border border-dashed border-[#27272A] bg-[#0b0b0b] p-5 text-slate-400">
                    <p className="text-sm">Enter a Drop Key to reveal text, image, video, PDF or download options.</p>
                  </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: Lock,
            title: 'No Login Required',
            description: 'Share files or text instantly without creating an account.',
          },
          {
            icon: Zap,
            title: 'Instant Sharing',
            description: 'Upload files, text, or both and receive a unique 4-digit Drop Key in seconds.',
          },
          {
            icon: HardDrive,
            title: '50 MB Upload Limit',
            description: 'Upload files, text, or both with a maximum total upload size of 50 MB.',
          },
        ].map((item) => {
          const IconComponent = item.icon;
            return (
            <div key={item.title} className="rounded-[1.25rem] border border-[#27272A] bg-[#111111] p-5 shadow-[0_10px_30px_rgba(2,6,23,0.6)]">
              <div className="flex items-start gap-3">
                <IconComponent className="h-6 w-6 flex-shrink-0 text-[#7C3AED]" aria-hidden="true" />
                <div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default HomePage;
