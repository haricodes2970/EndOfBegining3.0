import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import CursorFollower from './components/CursorFollower';
import SoundToggle from './components/SoundToggle';
import Home from './pages/Home';
import Constellation from './pages/Constellation';
import Vault from './pages/Vault';
import EchoesOfTime from './pages/EchoesOfTime';
import './styles/globals.css';

function AppInner() {
  const smootherRef = useRef<ReturnType<typeof ScrollSmoother.create> | null>(null);
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });

  useEffect(() => {
    const isMobile = window.matchMedia('(hover: none)').matches;
    if (!isMobile) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.4,
        effects: true,
      });
    }
    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  // Scroll to top and refresh triggers on every route change
  useEffect(() => {
    if (smootherRef.current) {
      smootherRef.current.scrollTo(0, false);
    } else {
      window.scrollTo(0, 0);
    }
    // Slight delay to let new page content render before refreshing triggers
    const id = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(id);
  }, [location.pathname]);

  return (
    <>
      <CursorFollower />
      <SoundToggle />
      {showSplash ? (
        <SplashScreen
          onComplete={() => {
            sessionStorage.setItem('splashShown', 'true');
            setShowSplash(false);
          }}
        />
      ) : null}
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route path="/"         element={<Home />}     />
            <Route path="/echoes-of-time" element={<EchoesOfTime />} />
            <Route path="/constellation" element={<Constellation />} />
            <Route path="/vault"    element={<Vault />}    />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
