import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, Gamepad2, Trophy, Download, Star, Clock, DollarSign, Heart, MessageCircle, Share2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: 2000000, suffix: '+', label: 'Active Players', color: 'from-blue-500 to-cyan-500' },
  { icon: Gamepad2, value: 70, suffix: '+', label: 'Games Available', color: 'from-red-500 to-pink-500' },
  { icon: Trophy, value: 500, suffix: '+', label: 'Tournaments', color: 'from-yellow-500 to-orange-500' },
  { icon: Download, value: 10000000, suffix: '+', label: 'Downloads', color: 'from-green-500 to-emerald-500' },
];

const smallStats = [
  { icon: Star, value: '4.9', label: 'Average Rating', color: 'text-yellow-500' },
  { icon: Clock, value: '24/7', label: 'Support', color: 'text-blue-500' },
  { icon: DollarSign, value: '$0', label: 'Free Games', color: 'text-green-500' },
  { icon: Heart, value: '1M+', label: 'Likes', color: 'text-pink-500' },
  { icon: MessageCircle, value: '500K+', label: 'Reviews', color: 'text-purple-500' },
  { icon: Share2, value: '2M+', label: 'Shares', color: 'text-indigo-500' },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toString();
};

const AnimatedCounter = ({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / (duration * 1000), 1);
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(easeProgress * value));
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            animate();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={counterRef}>
      {formatNumber(count)}{suffix}
    </span>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainStatsRef = useRef<HTMLDivElement>(null);
  const smallStatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mainStats = mainStatsRef.current?.querySelectorAll('.main-stat');
      if (mainStats) {
        gsap.fromTo(
          mainStats,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: mainStatsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const smallStatsItems = smallStatsRef.current?.querySelectorAll('.small-stat');
      if (smallStatsItems) {
        gsap.fromTo(
          smallStatsItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: smallStatsRef.current,
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
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-sm text-red-400 mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Numbers That <span className="text-gradient">Speak</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Join millions of players who trust GameVerse for their gaming needs
          </p>
        </div>

        {/* Main Stats */}
        <div ref={mainStatsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="main-stat group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 text-center"
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} p-0.5`}>
                <div className="w-full h-full bg-[#090909] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Value */}
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <div className="text-gray-400 text-sm uppercase tracking-wider">
                {stat.label}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div ref={smallStatsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {smallStats.map((stat, index) => (
            <div
              key={index}
              className="small-stat group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 text-center"
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color} group-hover:scale-110 transition-transform`} />
              <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
