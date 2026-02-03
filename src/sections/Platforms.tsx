import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Monitor, Gamepad2, Smartphone, Tv, Globe, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const platforms = [
  {
    name: 'PC',
    icon: Monitor,
    games: '5000+',
    color: 'from-blue-500 to-blue-600',
    description: 'Ultimate gaming experience',
  },
  {
    name: 'PlayStation',
    icon: Gamepad2,
    games: '3000+',
    color: 'from-blue-600 to-indigo-600',
    description: 'Exclusive titles',
  },
  {
    name: 'Xbox',
    icon: Gamepad2,
    games: '3500+',
    color: 'from-green-500 to-green-600',
    description: 'Game Pass ready',
  },
  {
    name: 'Nintendo',
    icon: Tv,
    games: '2000+',
    color: 'from-red-500 to-red-600',
    description: 'Portable gaming',
  },
  {
    name: 'Mobile',
    icon: Smartphone,
    games: '10000+',
    color: 'from-purple-500 to-purple-600',
    description: 'Play anywhere',
  },
  {
    name: 'Cloud',
    icon: Globe,
    games: '2000+',
    color: 'from-cyan-500 to-cyan-600',
    description: 'No downloads needed',
  },
];

const Platforms = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
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

      const platformCards = platformsRef.current?.querySelectorAll('.platform-card');
      if (platformCards) {
        gsap.fromTo(
          platformCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: platformsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-sm text-red-400 mb-4">
            Multi Platform
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Available on <span className="text-gradient">All Platforms</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Play your favorite games on any device, anywhere, anytime
          </p>
        </div>

        {/* Platforms Grid */}
        <div ref={platformsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="platform-card group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 text-center cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${platform.color} p-0.5`}>
                <div className="w-full h-full bg-[#090909] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <platform.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                {platform.name}
              </h3>

              {/* Games count */}
              <div className="text-2xl font-bold text-gradient mb-1">
                {platform.games}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500">
                {platform.description}
              </p>

              {/* Cross-platform indicator */}
              <div className="mt-4 flex justify-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                <Zap className="w-3 h-3 text-white" />
                <span className="text-xs text-gray-400">Cross-platform</span>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
