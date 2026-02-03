import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Gamepad2, Trophy, Star, Target, Zap, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, value: '2M+', label: 'Active Players', color: 'text-blue-400' },
  { icon: Gamepad2, value: '70+', label: 'Games Available', color: 'text-green-400' },
  { icon: Trophy, value: '500+', label: 'Tournaments', color: 'text-yellow-400' },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1,
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll('.stat-item');
      if (statElements) {
        gsap.fromTo(
          statElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
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
    <section
      id="about"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/about-warrior.jpg"
                alt="Gaming Warrior"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 p-6 bg-[#090909] border border-white/10 rounded-xl shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-sm text-gray-500">User Rating</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-red-500/20 rounded-xl"></div>
            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-red-500/10 rounded-full blur-xl"></div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <div>
              <span className="inline-block px-4 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-sm text-red-400 mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Who We <span className="text-gradient">Are</span>
              </h2>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed">
              GameVerse is the ultimate destination for gamers worldwide. We provide a vast collection 
              of games across all platforms, from indie gems to AAA titles. Our platform connects 
              millions of players, fostering a vibrant gaming community.
            </p>

            <p className="text-gray-500 leading-relaxed">
              Founded in 2024, we have grown to become one of the largest gaming platforms, 
              offering exclusive deals, early access to new releases, and a seamless gaming experience. 
              Our mission is to make gaming accessible to everyone, everywhere.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: Target, text: 'Curated Game Selection' },
                { icon: Zap, text: 'Lightning Fast Downloads' },
                { icon: Shield, text: 'Secure Transactions' },
                { icon: Users, text: 'Active Community' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-sm text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/5">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <div className={`w-14 h-14 mx-auto mb-4 bg-white/5 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
