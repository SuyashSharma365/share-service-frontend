import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import DisclaimerPage from './pages/DisclaimerPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Layout>
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageTransition>
    </Layout>
  );
}

export default App;
