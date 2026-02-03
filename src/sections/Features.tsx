import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Gamepad2, Users, Trophy, Zap, Shield, Sparkles,
  TrendingUp, Clock, Heart, Award, Target, Flame
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Gamepad2,
    title: '70+ Games',
    description: 'Explore a vast library of games across all genres',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: Users,
    title: '2M+ Players',
    description: 'Join a thriving community of gamers worldwide',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Trophy,
    title: 'Tournaments',
    description: 'Compete in daily tournaments and win prizes',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Zap,
    title: 'Fast Downloads',
    description: 'Lightning-fast download speeds for all games',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Your data and purchases are always protected',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Sparkles,
    title: 'New Releases',
    description: 'Get access to the latest games as they launch',
    color: 'from-pink-500 to-pink-600',
  },
];

const additionalFeatures = [
  { icon: TrendingUp, label: 'Trending Games', value: '24/7 Updates' },
  { icon: Clock, label: 'Fast Support', value: '24/7 Help' },
  { icon: Heart, label: 'Community', value: 'Active Forums' },
  { icon: Award, label: 'Achievements', value: '500+ Badges' },
  { icon: Target, label: 'Challenges', value: 'Daily Quests' },
  { icon: Flame, label: 'Hot Deals', value: 'Up to 80% Off' },
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const extras = extrasRef.current?.querySelectorAll('.extra-feature');
      if (extras) {
        gsap.fromTo(
          extras,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: extrasRef.current,
              start: 'top 90%',
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
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-sm text-red-400 mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            The Ultimate <span className="text-gradient">Gaming</span> Experience
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need for the perfect gaming journey, all in one place
          </p>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-6`}>
                <div className="w-full h-full bg-[#121212] rounded-xl flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-red-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div ref={extrasRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className="extra-feature group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-red-500/30 transition-all duration-300 text-center"
            >
              <feature.icon className="w-6 h-6 mx-auto mb-2 text-red-500 group-hover:scale-110 transition-transform" />
              <div className="text-sm font-medium text-white mb-1">{feature.label}</div>
              <div className="text-xs text-gray-500">{feature.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
