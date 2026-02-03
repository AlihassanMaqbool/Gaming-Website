import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Star, ChevronRight, TrendingUp } from 'lucide-react';
import { games } from '../data/games';

gsap.registerPlugin(ScrollTrigger);

const TrendingGames = () => {
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

      const cards = cardsRef.current?.querySelectorAll('.trending-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
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

  const trendingGames = games.filter(game => game.isTrending).slice(0, 4);

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-400 uppercase tracking-wider">Trending Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Most Popular Games</h2>
          </div>
          <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors group">
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Horizontal Scroll Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingGames.map((game, index) => (
            <div
              key={game.id}
              className="trending-card group flex gap-6 p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/5 hover:border-red-500/30 transition-all duration-300 cursor-pointer"
            >
              {/* Rank */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-red-400">#{index + 1}</span>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>

              {/* Image */}
              <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">{game.genre}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-white">{game.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors truncate">
                  {game.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {game.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">${game.price}</span>
                  <div className="flex gap-1">
                    {game.platform.slice(0, 2).map((platform, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/5 rounded text-xs text-gray-500"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingGames;
