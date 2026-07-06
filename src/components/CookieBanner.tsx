import { useEffect, useState } from 'react';

const COOKIE_NAME = 'dropcode_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem(COOKIE_NAME);
    setVisible(!accepted);
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem(COOKIE_NAME, 'accepted');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <section className="cookie-banner bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold">DropCode cookie notice</p>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            We use cookies and local storage only to improve site behavior and preserve your preferences. No tracking or advertising cookies are required for core functionality.
          </p>
        </div>
        <button
          type="button"
          onClick={acceptCookies}
          className="inline-flex items-center justify-center rounded-full bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-600"
        >
          Accept cookies
        </button>
      </div>
    </section>
  );
}
