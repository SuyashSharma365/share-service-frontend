import Seo from '../components/Seo';

function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="About DropCode"
        description="Learn about DropCode, the anonymous file and text sharing frontend built for privacy and ease of use."
        path="/about"
      />
      <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-700">About DropCode</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">A clean, secure sharing experience.</h1>
        <p className="mt-6 text-base leading-8 text-slate-600">
          DropCode is designed for anonymous file and text sharing with polished UX, lightweight performance, and semantic SEO structure. The frontend works seamlessly across desktop, tablet and mobile devices.
        </p>
        <p className="text-base leading-8 text-slate-600">
          Users can upload a file, text, or both, receive a 4-digit key, and retrieve content later without intrusive alerts. The interface makes retrieval effortless and reliable.
        </p>
      </div>
    </section>
  );
}

export default AboutPage;
