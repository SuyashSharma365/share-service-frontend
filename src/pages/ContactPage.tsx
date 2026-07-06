import Seo from '../components/Seo';

function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Contact | DropCode"
        description="Contact DropCode for support, questions, or partnership inquiries about anonymous file sharing."
        path="/contact"
      />
      <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <h1 id="contact-heading" className="text-4xl font-semibold tracking-tight text-slate-950">
          Contact DropCode
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Reach out for product support, integration questions, or feature feedback. We aim to keep the interface fast, secure, and easy to use.
        </p>
        <form className="mt-8 grid gap-6">
          <label className="grid gap-2 text-sm font-semibold text-slate-900" htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              type="text"
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              placeholder="Your name"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-900" htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-900" htmlFor="message">
            Message
            <textarea
              id="message"
              name="message"
              rows={5}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
              placeholder="How can we help?"
            />
          </label>

          <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-purple-700 px-6 py-4 text-base font-semibold text-white transition hover:bg-purple-800">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
