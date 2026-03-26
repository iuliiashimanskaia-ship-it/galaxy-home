import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Catalog } from '@/sections/Catalog';
import { About } from '@/sections/About';
import { Agent } from '@/sections/Agent';
import { FAQ } from '@/sections/FAQ';
import { Contacts } from '@/sections/Contacts';
import { Footer } from '@/sections/Footer';
import { HouseDetail } from '@/pages/HouseDetail';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Main page with all sections
function MainPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Catalog />
        <About />
        <Agent />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/house/:slug" element={<HouseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
