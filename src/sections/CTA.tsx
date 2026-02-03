import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Gamepad2, Users, Trophy, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageLeftRef = useRef<HTMLDivElement>(null);
  const imageRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageLeftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageRightRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20"></div>
          <div className="absolute inset-0 bg-[#090909]/80"></div>

          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          ></div>

          <div className="relative grid lg:grid-cols-3 gap-8 items-center p-8 md:p-12 lg:p-16">
            {/* Left Image */}
            <div ref={imageLeftRef} className="hidden lg:block">
              <div className="relative rounded-xl overflow-hidden transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/games/game-cyber-samurai.jpg"
                  alt="Cyber Samurai"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white">Limited Time Offer</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Ready to <span className="text-gradient">Level Up</span>?
              </h2>

              <p className="text-gray-300 text-lg max-w-lg mx-auto">
                Join millions of players in the ultimate gaming destination. 
                New games added daily, exclusive deals, and endless adventures await.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
                  <Gamepad2 className="w-5 h-5 text-red-400" />
                  <span className="text-sm text-gray-300">70+ Games</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">2M+ Players</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-300">Daily Tournaments</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-2 group">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div ref={imageRightRef} className="hidden lg:block">
              <div className="relative rounded-xl overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/games/game-space-explorer.jpg"
                  alt="Space Explorer"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
