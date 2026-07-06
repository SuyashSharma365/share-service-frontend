import Seo from '../components/Seo';

function TermsPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Terms of Service | DropCode"
        description="Review the DropCode terms of service for anonymous file and text sharing."
        path="/terms"
      />
      <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <h1 id="terms-heading" className="text-4xl font-semibold tracking-tight text-slate-950">
          Terms of Service
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          By using DropCode, you agree to upload and retrieve content responsibly. The platform is intended for anonymous text and file sharing only.
        </p>
        <p className="text-base leading-8 text-slate-600">
          Do not use DropCode to store or distribute harmful, illegal, or copyrighted content. The service is not intended as long-term storage.
        </p>
      </div>
    </section>
  );
}

export default TermsPage;
