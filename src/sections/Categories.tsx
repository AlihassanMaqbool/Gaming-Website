import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Swords, Rocket, Puzzle, Car, Users, Gamepad2,
  Target, Ghost, Music, CreditCard, Crown, Sword
} from 'lucide-react';
import { categories } from '../data/games';

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: { [key: string]: React.ElementType } = {
  Action: Swords,
  Adventure: Rocket,
  RPG: Crown,
  Shooter: Target,
  Strategy: Gamepad2,
  Racing: Car,
  Sports: Users,
  Horror: Ghost,
  Puzzle: Puzzle,
  Simulation: CreditCard,
  Fighting: Sword,
  Stealth: Ghost,
  'Card Game': CreditCard,
  Music: Music,
  'Battle Royale': Crown,
  Survival: Ghost,
  Mystery: Puzzle,
  All: Gamepad2,
};

const Categories = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

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

      const categoryItems = categoriesRef.current?.querySelectorAll('.category-item');
      if (categoryItems) {
        gsap.fromTo(
          categoryItems,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: categoriesRef.current,
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
    <section ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-sm text-red-400 mb-4">
            Browse by Genre
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Game <span className="text-gradient">Categories</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find your perfect game from our extensive collection of categories
          </p>
        </div>

        {/* Categories Grid */}
        <div ref={categoriesRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category] || Gamepad2;
            const colors = [
              'from-red-500 to-red-600',
              'from-blue-500 to-blue-600',
              'from-green-500 to-green-600',
              'from-yellow-500 to-yellow-600',
              'from-purple-500 to-purple-600',
              'from-pink-500 to-pink-600',
            ];
            const color = colors[index % colors.length];

            return (
              <div
                key={category}
                className="category-item group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer text-center"
              >
                {/* Icon */}
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${color} p-0.5`}>
                  <div className="w-full h-full bg-[#090909] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                  {category}
                </h3>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;