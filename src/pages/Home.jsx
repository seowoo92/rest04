import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSnapScroll } from '../hooks/useSnapScroll';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  const { dark, toggleDark } = useTheme();

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const reviewsRef = useRef(null);
  const contactRef = useRef(null);

  useSnapScroll([heroRef, aboutRef, servicesRef, reviewsRef, contactRef]);

  return (
    <>
      <Navbar dark={dark} toggleDark={toggleDark} />
      <div ref={heroRef}><Hero /></div>
      <div ref={aboutRef}><About /></div>
      <div ref={servicesRef}><Services /></div>
      <div ref={reviewsRef}><Reviews /></div>
      <div ref={contactRef}><Contact /></div>
      <Footer />
    </>
  );
}
