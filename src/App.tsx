import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { MinimalFooter } from './components/MinimalFooter';
import { ScrollProgress } from './components/ScrollProgress';
import { AccessibilityButton } from './components/AccessibilityButton';
import { Suspense, lazy } from 'react';
import { Loader } from './components/Loader';

// Lazy load pages and components for better performance
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const WorkPage = lazy(() => import('./pages/WorkPage').then(m => ({ default: m.WorkPage })));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const Chatbot = lazy(() => import('./components/Chatbot').then(m => ({ default: m.Chatbot })));

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
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
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
