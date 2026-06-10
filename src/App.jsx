import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import AboutCeo from './pages/AboutCeo';
import AboutVision from './pages/AboutVision';
import AboutHistory from './pages/AboutHistory';
import AboutBrand from './pages/AboutBrand';
import ServicesPage from './pages/Services';
import ServicesHow from './pages/ServicesHow';
import ReviewsPage from './pages/Reviews';
import ContactPage from './pages/Contact';
import Login from './pages/Login';
import NoticeList from './pages/board/NoticeList';
import NoticeDetail from './pages/board/NoticeDetail';
import FreeList from './pages/board/FreeList';
import FreeDetail from './pages/board/FreeDetail';
import BoardWrite from './pages/board/BoardWrite';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
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
          <Route path="/login" element={<Login />} />
          <Route path="/board/notice" element={<NoticeList />} />
          <Route path="/board/notice/write" element={<BoardWrite />} />
          <Route path="/board/notice/:id/edit" element={<BoardWrite />} />
          <Route path="/board/notice/:id" element={<NoticeDetail />} />
          <Route path="/board/free" element={<FreeList />} />
          <Route path="/board/free/write" element={<BoardWrite />} />
          <Route path="/board/free/:id/edit" element={<BoardWrite />} />
          <Route path="/board/free/:id" element={<FreeDetail />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
