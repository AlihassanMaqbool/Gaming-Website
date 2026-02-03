import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Award, Crown, Diamond, ChevronRight } from 'lucide-react';
import { games } from '../data/games';

gsap.registerPlugin(ScrollTrigger);

const TopRatedGames = () => {
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

      const cards = cardsRef.current?.querySelectorAll('.top-rated-card');
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const topRatedGames = games
    .filter(game => game.rating >= 4.8)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return Crown;
      case 1: return Diamond;
      case 2: return Award;
      default: return Star;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'from-yellow-500 to-yellow-600';
      case 1: return 'from-gray-300 to-gray-400';
      case 2: return 'from-orange-500 to-orange-600';
      default: return 'from-red-500 to-red-600';
    }
  };

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-yellow-400 uppercase tracking-wider">Top Rated</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Highest Rated Games</h2>
          </div>
          <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors group">
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRatedGames.map((game, index) => {
            const RankIcon = getRankIcon(index);
            const rankColor = getRankColor(index);
            return (
              <div
                key={game.id}
                className="top-rated-card group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/5 hover:border-yellow-500/30 transition-all duration-500"
              >
                {/* Rank badge */}
                <div className={`absolute top-4 left-4 z-10 w-10 h-10 rounded-xl bg-gradient-to-br ${rankColor} flex items-center justify-center`}>
                  <RankIcon className="w-5 h-5 text-white" />
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent"></div>
                  
                  {/* Rating badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-lg flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-white">{game.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">{game.genre}</span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-400">{game.releaseDate}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                    {game.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {game.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">${game.price}</span>
                    <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500 text-yellow-400 hover:text-white rounded-lg text-sm font-medium transition-all">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopRatedGames;
