import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { MinimalFooter } from './components/MinimalFooter';
import { ScrollProgress } from './components/ScrollProgress';
import { AccessibilityButton } from './components/AccessibilityButton';
import { Chatbot } from './components/Chatbot';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { Suspense } from 'react';
import { Loader } from './components/Loader';

function AppContent() {
  return (
    <main className="relative">
      <ScrollProgress />
      <AccessibilityButton />
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </Suspense>
      <Chatbot />
      <MinimalFooter />
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="antialiased">
          <AppContent />
        </div>
      </Router>
    </ThemeProvider>
  );
}
