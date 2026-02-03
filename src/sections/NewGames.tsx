import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { games } from '../data/games';

gsap.registerPlugin(ScrollTrigger);

const NewGames = () => {
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

      const cards = cardsRef.current?.querySelectorAll('.new-game-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
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

  const newGames = games.filter(game => game.isNew).slice(0, 3);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-400 uppercase tracking-wider">Just Released</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">New Games</h2>
          </div>
          <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors group">
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Cards - Deck Style */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newGames.map((game) => (
            <div
              key={game.id}
              className="new-game-card group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/5 hover:border-red-500/30 transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent"></div>
                
                {/* New Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full">
                  <Clock className="w-3 h-3" />
                  NEW
                </div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
                  <span className="text-lg font-bold text-white">${game.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">{game.genre}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-white">{game.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-red-400 transition-colors">
                  {game.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {game.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {game.platform.slice(0, 3).map((platform, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/5 rounded text-xs text-gray-500"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewGames;
