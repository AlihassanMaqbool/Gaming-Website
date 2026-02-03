import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, CheckCircle, Sparkles, Gift, Bell } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Gift, text: 'Exclusive game discounts' },
  { icon: Bell, text: 'New release notifications' },
  { icon: Sparkles, text: 'Early access to betas' },
  { icon: Mail, text: 'Weekly gaming news' },
];

const Newsletter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={contentRef}
          className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 text-center overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            ></div>
          </div>

          {isSubmitted ? (
            <div className="relative z-10 animate-bounce-in">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Welcome to the Club!</h3>
              <p className="text-gray-400">
                Check your inbox for exclusive deals and updates.
              </p>
            </div>
          ) : (
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
                <Mail className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay in the <span className="text-gradient">Game</span>
              </h2>

              {/* Description */}
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Subscribe to our newsletter and never miss out on exclusive deals, 
                new game releases, and gaming news.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 justify-center text-sm text-gray-400"
                  >
                    <benefit.icon className="w-4 h-4 text-red-400" />
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Subscribe</span>
                </button>
              </form>

              {/* Trust text */}
              <p className="mt-6 text-xs text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
