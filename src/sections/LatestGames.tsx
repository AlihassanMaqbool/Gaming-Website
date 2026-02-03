import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronRight, Gamepad2 } from 'lucide-react';
import { games } from '../data/games';

gsap.registerPlugin(ScrollTrigger);

const LatestGames = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.game-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
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

  const latestGames = games.slice(0, 6);

  return (
    <section
      id="latest-games"
      ref={sectionRef}
      className="py-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Gamepad2 className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-400 uppercase tracking-wider">Latest Releases</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">New Arrivals</h2>
          </div>
          <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors group">
            <span>View All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Game Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestGames.map((game) => (
            <div
              key={game.id}
              className="game-card group relative rounded-xl overflow-hidden bg-[#121212] cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                {/* New Badge */}
                {game.isNew && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    NEW
                  </div>
                )}

                {/* Platform Icons */}
                <div className="absolute top-4 right-4 flex gap-1">
                  {game.platform.slice(0, 3).map((platform, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="text-xs font-bold">{platform[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-400">{game.genre}</span>
                  <span className="text-xs text-gray-600">•</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-white">{game.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-red-400 transition-colors">
                  {game.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white">
                    ${game.price}
                  </span>
                  <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg text-sm font-medium transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestGames;
