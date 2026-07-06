import { useState } from 'react';
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
      
    }
    catch (error: any) {
      console.log("Upload Error:", error);
      console.log("Response:", error.response);
      console.log("Data:", error.response?.data);

      toast.showToast(
      error.response?.data?.message ||
      error.message ||
      'Drop failed. Please try again.',
      'error'
      );
    }
    //  catch (error) {
    //   toast.showToast('Drop failed. Please try again.', 'error');
    // }
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Seo
        title="DropCode | Anonymous file & text sharing"
        description="Share files or text securely with a simple 4-digit key. Fast. Private. Simple."
        path="/"
      />

      <section className="grid min-h-[calc(100vh-4rem)] gap-6 xl:grid-cols-2 xl:items-stretch">
        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_40px_120px_rgba(15,23,42,0.08)] xl:h-full">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-700">Drop Content</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Drop anything. Retrieve anywhere.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Share files or text securely using a simple 4-digit key. No login required.
              </p>
            </div>

            <div className="mt-6">
              {!shareKey ? (
                <UploadCard onSubmit={handleUpload} isLoading={uploadMutation.isLoading} />
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

        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_40px_120px_rgba(15,23,42,0.08)] xl:h-full">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-700">Retrieve Content</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Enter your 4-digit Drop Key
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Quickly retrieve text, images, video, PDF, or downloads without leaving the screen.
              </p>
            </div>

            <div className="space-y-6">
              <RetrieveCard onRetrieve={handleRetrieve} isLoading={retrieveMutation.isLoading} />
              {retrieveMutation.isLoading ? (
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                  <div className="space-y-3">
                    <div className="h-6 w-3/4 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-5 w-1/2 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-56 animate-pulse rounded-[1.75rem] bg-slate-200" />
                  </div>
                </div>
              ) : retrievedContent ? (
                <ContentPreview message={retrievedContent.message} data={retrievedContent.data} />
              ) : (
                <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 p-6 text-slate-600">
                  <p className="text-sm">Enter a Drop Key to reveal text, image, video, PDF or download options.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Drop design first',
            description: 'The main input and retrieve panels are visible immediately on desktop, tablet and mobile.',
          },
          {
            title: 'Balanced split screen',
            description: 'Both panels share equal height and a premium SaaS-style layout.',
          },
          {
            title: 'Modern polish',
            description: 'Rounded corners, soft shadows, and an uncluttered interface create a professional feel.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
