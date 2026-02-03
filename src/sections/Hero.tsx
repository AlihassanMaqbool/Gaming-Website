import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Users, Gamepad2, Trophy } from 'lucide-react';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero = ({ scrollToSection }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      );

      // Buttons animation
      gsap.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.6 }
      );

      // Image 1 animation
      gsap.fromTo(
        image1Ref.current,
        { opacity: 0, x: 100, rotateY: 15 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: 'power2.out', delay: 0.3 }
      );

      // Image 2 animation
      gsap.fromTo(
        image2Ref.current,
        { opacity: 0, x: 150, rotateY: -15 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: 'power2.out', delay: 0.5 }
      );

      // Stats animation
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );

      // Floating animation for images
      gsap.to(image1Ref.current, {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to(image2Ref.current, {
        y: 10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-red-400">Now Featuring 70+ Games</span>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              Dive into the{' '}
              <span className="text-gradient">World of Games</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg text-gray-400 max-w-xl leading-relaxed"
            >
              Discover new games, connect with players, and level up your gaming experience. 
              Join millions of gamers in the ultimate gaming destination.
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('latest-games')}
                className="btn-primary flex items-center gap-2 group"
              >
                <span>Explore Games</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className="btn-secondary flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Join Community</span>
              </button>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gamepad2 className="w-5 h-5 text-red-500" />
                  <span className="text-3xl font-bold text-white">70+</span>
                </div>
                <span className="text-sm text-gray-500">Games</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-red-500" />
                  <span className="text-3xl font-bold text-white">2M+</span>
                </div>
                <span className="text-sm text-gray-500">Players</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-red-500" />
                  <span className="text-3xl font-bold text-white">50+</span>
                </div>
                <span className="text-sm text-gray-500">Awards</span>
              </div>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative hidden lg:block">
            <div
              ref={image1Ref}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero-robot.jpg"
                  alt="Futuristic Robot"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>

            <div
              ref={image2Ref}
              className="absolute -bottom-10 -right-10 w-64 z-20"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-[#090909]">
                <img
                  src="/images/hero-soldier.jpg"
                  alt="Space Soldier"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 -left-10 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-20 -left-20 w-32 h-32 bg-red-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#090909] to-transparent"></div>
    </section>
  );
};

export default Hero;
