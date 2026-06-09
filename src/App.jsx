import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import AboutCeo from './pages/AboutCeo';
import AboutVision from './pages/AboutVision';
import AboutHistory from './pages/AboutHistory';
import AboutBrand from './pages/AboutBrand';
import ServicesPage from './pages/Services';
import ServicesHow from './pages/ServicesHow';
import ReviewsPage from './pages/Reviews';
import ContactPage from './pages/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/ceo" element={<AboutCeo />} />
        <Route path="/about/vision" element={<AboutVision />} />
        <Route path="/about/history" element={<AboutHistory />} />
        <Route path="/about/brand" element={<AboutBrand />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/how" element={<ServicesHow />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </ThemeProvider>
  );
}
