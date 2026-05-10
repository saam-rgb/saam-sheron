import { useState, useEffect, useRef } from 'react';
import Ribbon from './components/Ribbon';
import Hero from './components/Hero';
import Receipts from './components/Receipts';
import LiveBrief from './components/LiveBrief';
import WorkCards from './components/WorkCards';
import ObserveCard from './components/ObserveCard';
import TryMe from './components/TryMe';
import BriefSheet from './components/BriefSheet';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

function App() {
  const startTime = useRef(Date.now());
  const [dwell, setDwell] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeRole, setActiveRole] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDwell(Math.floor((Date.now() - startTime.current) / 1000));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? Math.min(100, Math.round((h.scrollTop / total) * 100)) : 0;
      setScrollPct(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal-head');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => {
      el.classList.add('reveal');
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) el.classList.add('in');
      else io.observe(el);
      setTimeout(() => el.classList.add('in'), 1500);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="wrap">
      <Ribbon dwell={dwell} scrollPct={scrollPct} />
      <Hero />
      <Receipts />
      <LiveBrief activeRole={activeRole} onRoleSelect={setActiveRole} />
      <WorkCards activeRole={activeRole} />
      <ObserveCard dwell={dwell} />
      <TryMe />
      <BriefSheet />
      <ContactCTA />
      <Footer />
    </div>
  );
}

export default App;
