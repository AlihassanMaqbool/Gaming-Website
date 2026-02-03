import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: 'AC',
    rating: 5,
    text: 'GameVerse has completely transformed my gaming experience. The vast library and amazing deals are unbeatable!',
    game: 'Cyber Samurai',
    date: '2 days ago',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: 'SJ',
    rating: 5,
    text: 'The community features are fantastic. I have made so many new friends who share my passion for gaming.',
    game: 'Dragon\'s Legend',
    date: '1 week ago',
  },
  {
    id: 3,
    name: 'Mike Williams',
    avatar: 'MW',
    rating: 4,
    text: 'Great platform with excellent customer support. Had an issue with a purchase and it was resolved within hours.',
    game: 'Space Explorer',
    date: '3 days ago',
  },
  {
    id: 4,
    name: 'Emily Davis',
    avatar: 'ED',
    rating: 5,
    text: 'The best gaming platform I have ever used. The interface is clean, and the game recommendations are spot on!',
    game: 'Zombie Survival',
    date: '5 days ago',
  },
  {
    id: 5,
    name: 'James Wilson',
    avatar: 'JW',
    rating: 5,
    text: 'Amazing collection of indie games. Found so many hidden gems that I would have never discovered otherwise.',
    game: 'Stealth Ninja',
    date: '1 day ago',
  },
  {
    id: 6,
    name: 'Lisa Brown',
    avatar: 'LB',
    rating: 4,
    text: 'Fast downloads, great prices, and an active community. Everything a gamer could ask for!',
    game: 'Wizard Academy',
    date: '4 days ago',
  },
];

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const reviewCards = cardsRef.current?.querySelectorAll('.review-card');
      if (reviewCards) {
        gsap.fromTo(
          reviewCards,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-purple-400 uppercase tracking-wider">Player Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Players <span className="text-gradient">Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join millions of satisfied gamers who trust GameVerse
          </p>
        </div>

        {/* Reviews Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="review-card group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-purple-500/30 mb-4" />

              {/* Review Text */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{review.text}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Game */}
              <div className="text-sm text-purple-400 mb-6">
                Playing: {review.game}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{review.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-white">{review.name}</div>
                  <div className="text-xs text-gray-500">{review.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {[
            { value: '4.9', label: 'Average Rating' },
            { value: '500K+', label: 'Reviews' },
            { value: '98%', label: 'Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
