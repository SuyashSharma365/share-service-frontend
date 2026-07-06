import Seo from '../components/Seo';

function PrivacyPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Privacy Policy | DropCode"
        description="Read the DropCode privacy policy for anonymous file and text sharing."
        path="/privacy"
      />
      <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <h1 id="privacy-heading" className="text-4xl font-semibold tracking-tight text-slate-950">
          Privacy Policy
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          We collect only the minimum information needed to deliver a reliable sharing experience. Uploaded content is processed and returned through our backend API without storing unnecessary personal data.
        </p>
        <p className="text-base leading-8 text-slate-600">
          Cookie and tracking usage is limited to site improvement and compliance. User data is never sold or shared with third parties for advertising.
        </p>
      </div>
    </section>
  );
}

export default PrivacyPage;
