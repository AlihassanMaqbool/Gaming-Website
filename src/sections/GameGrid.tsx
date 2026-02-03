import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Star, ChevronLeft, ChevronRight, Search,
  Grid3X3, LayoutGrid
} from 'lucide-react';
import { games, categories } from '../data/games';

gsap.registerPlugin(ScrollTrigger);

const GameGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  
  const itemsPerPage = 12;
  
  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'All' || game.genre === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGames = filteredGames.slice(startIndex, startIndex + itemsPerPage);

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

      const gameCards = gridRef.current?.querySelectorAll('.game-card');
      if (gameCards) {
        gsap.fromTo(
          gameCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentPage, selectedCategory, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: sectionRef.current?.offsetTop || 0, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="game-grid" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All <span className="text-gradient">Games</span>
          </h2>
          <p className="text-gray-400">
            Browse our complete collection of {games.length} games
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-red-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* View Mode */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('large')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'large' ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Games Grid */}
        <div 
          ref={gridRef} 
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {currentGames.map((game) => (
            <div
              key={game.id}
              className="game-card group relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/5 hover:border-red-500/30 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'aspect-[4/5]' : 'aspect-[16/10]'}`}>
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent"></div>
                
                {/* Rating */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-white font-medium">{game.rating}</span>
                </div>

                {/* Discount Badge */}
                {game.discount && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-green-500 rounded text-xs font-bold text-white">
                    -{game.discount}%
                  </div>
                )}

                {/* New Badge */}
                {game.isNew && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 rounded text-xs font-bold text-white">
                    NEW
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">{game.genre}</span>
                  {game.isTrending && (
                    <span className="px-2 py-1 bg-red-500/20 rounded text-xs text-red-400">Trending</span>
                  )}
                </div>
                
                <h3 className={`font-bold mb-2 group-hover:text-red-400 transition-colors ${
                  viewMode === 'grid' ? 'text-sm' : 'text-lg'
                }`}>
                  {game.title}
                </h3>
                
                {viewMode === 'large' && (
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {game.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">${game.price}</span>
                  <div className="flex gap-1">
                    {game.platform.slice(0, 3).map((platform, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/5 rounded text-xs text-gray-500"
                      >
                        {platform[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-red-500 text-white'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GameGrid;
