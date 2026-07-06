import Seo from '../components/Seo';

const faqs = [
  {
    question: 'Is the experience mobile-friendly?',
    answer: 'Yes. The layout uses responsive design patterns for small and large screens alike.',
  },
  {
    question: 'Can ads be added later?',
    answer: 'Yes. The layout includes reserved spaces that do not interfere with core tasks or primary actions.',
  },
  {
    question: 'Is the site accessible?',
    answer: 'The UI uses semantic structure, visible labels, keyboard-friendly navigation, and strong contrast.',
  },
];

function FaqPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="FAQ | DropCode"
        description="Frequently asked questions about DropCode anonymous uploads, retrieval, and privacy."
        path="/faq"
      />
      <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        <h1 id="faq-heading" className="text-4xl font-semibold tracking-tight text-slate-950">
          Frequently Asked Questions
        </h1>
        <div className="mt-8 space-y-6">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-950">{faq.question}</h2>
              <p className="mt-3 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqPage;
