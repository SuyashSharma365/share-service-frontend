import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

function NotFoundPage() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-8rem)] place-items-center px-4 py-16 sm:px-6 lg:px-8">
      <Seo
        title="Page Not Found | DropCode"
        description="The page you are looking for does not exist on DropCode."
        path="/404"
      />
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white/95 p-10 text-center shadow-2xl shadow-slate-200/50">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-700">404 error</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-slate-600 sm:text-lg">
          The link may be broken or the page may have moved. Head back to the home page to continue sharing securely.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-purple-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
