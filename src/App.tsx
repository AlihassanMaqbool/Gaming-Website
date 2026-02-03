import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gamepad2 } from 'lucide-react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import LatestGames from './sections/LatestGames';
import About from './sections/About';
import NewGames from './sections/NewGames';
import TrendingGames from './sections/TrendingGames';
import TopRatedGames from './sections/TopRatedGames';
import DiscountGames from './sections/DiscountGames';
import GameGrid from './sections/GameGrid';
import LoginForm from './sections/LoginForm';
import Features from './sections/Features';
import Stats from './sections/Stats';
import Categories from './sections/Categories';
import Platforms from './sections/Platforms';
import Reviews from './sections/Reviews';
import Community from './sections/Community';
import Newsletter from './sections/Newsletter';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Initialize animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#090909] flex items-center justify-center z-50">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Gamepad2 className="w-8 h-8 text-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-x-hidden noise-overlay">
      <Header onLoginClick={() => setShowLogin(true)} scrollToSection={scrollToSection} />
      
      <main>
        <Hero scrollToSection={scrollToSection} />
        <LatestGames />
        <Features />
        <NewGames />
        <About />
        <TrendingGames />
        <Stats />
        <TopRatedGames />
        <Categories />
        <DiscountGames />
        <Platforms />
        <GameGrid />
        <Reviews />
        <Community />
        <Newsletter />
        <CTA />
        <LoginForm isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </main>
      
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default App;
