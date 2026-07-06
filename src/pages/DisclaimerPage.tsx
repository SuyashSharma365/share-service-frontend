import Seo from '../components/Seo';

function DisclaimerPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Disclaimer | DropCode"
        description="Read the DropCode disclaimer and understand the limits of our anonymous sharing platform."
        path="/disclaimer"
      />
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/50 backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-700">Disclaimer</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">What to know before you share.</h1>
        <p className="mt-5 max-w-3xl text-slate-600 sm:text-lg">
          DropCode is an anonymous file and text sharing platform. We do not retain access credentials for uploaded content, and the service is designed for temporary, private sharing.
        </p>
        <div className="space-y-4 text-slate-600">
          <p>
            Uploaded content may be removed automatically after a period of time. If a share key no longer works, the content has likely expired.
          </p>
          <p>
            Do not upload illegal, copyrighted, or harmful content. The service is not intended for long-term archival storage.
          </p>
          <p>
            Always verify the origin of content you retrieve and exercise caution when downloading unknown files.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DisclaimerPage;
