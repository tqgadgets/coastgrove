import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import TopBar from './components/TopBar.jsx';
import BackgroundGlow from './components/ui/BackgroundGlow.jsx';
import MotionProvider from './components/ui/motion/MotionProvider.jsx';
import ScrollProgress from './components/ui/ScrollProgress.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';

export default function App() {
  return (
    <MotionProvider>
      <BrowserRouter>
        <ScrollToTop />
        <BackgroundGlow />
        <ScrollProgress />
        <div className="app-shell">
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <TopBar />
          <Header />
          <main id="main" className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </MotionProvider>
  );
}
