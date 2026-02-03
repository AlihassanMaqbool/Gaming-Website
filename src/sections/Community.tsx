import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, MessageSquare, Trophy, Gamepad2, 
  Heart, Share2, Star, Zap, Target, Flame
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const communityFeatures = [
  {
    icon: Users,
    title: 'Join Communities',
    description: 'Connect with players who share your gaming interests',
    stat: '2M+ Members',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with friends and teammates in real-time',
    stat: '24/7 Active',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Trophy,
    title: 'Tournaments',
    description: 'Compete in daily tournaments and climb the leaderboards',
    stat: '500+ Events',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Gamepad2,
    title: 'Team Up',
    description: 'Find teammates for multiplayer games instantly',
    stat: '10K+ Teams',
    color: 'from-purple-500 to-purple-600',
  },
];

const activities = [
  { icon: Heart, text: 'Sarah liked Dragon\'s Legend', time: '2 min ago', color: 'text-pink-500' },
  { icon: Star, text: 'Alex rated Cyber Samurai 5 stars', time: '5 min ago', color: 'text-yellow-500' },
  { icon: Trophy, text: 'Mike won 1st place in Tournament', time: '12 min ago', color: 'text-green-500' },
  { icon: Share2, text: 'Emily shared a game clip', time: '18 min ago', color: 'text-blue-500' },
  { icon: Flame, text: 'James is on a 10 win streak', time: '25 min ago', color: 'text-orange-500' },
  { icon: Zap, text: 'Lisa achieved level 50', time: '30 min ago', color: 'text-purple-500' },
];

const Community = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);

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

      const featureCards = featuresRef.current?.querySelectorAll('.feature-card');
      if (featureCards) {
        gsap.fromTo(
          featureCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const activityItems = activityRef.current?.querySelectorAll('.activity-item');
      if (activityItems) {
        gsap.fromTo(
          activityItems,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: activityRef.current,
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
      id="community"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-sm text-green-400 mb-4">
            Join the Fun
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gaming <span className="text-gradient">Community</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect with millions of players, join tournaments, and make new friends
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Features */}
          <div ref={featuresRef} className="space-y-6">
            {communityFeatures.map((feature, index) => (
              <div
                key={index}
                className="feature-card group flex gap-6 p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 flex-shrink-0`}>
                  <div className="w-full h-full bg-[#090909] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                      {feature.title}
                    </h3>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">
                      {feature.stat}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Feed */}
          <div className="lg:pl-8">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Live Activity</h3>
            </div>

            <div ref={activityRef} className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="activity-card activity-item flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${activity.color} group-hover:scale-110 transition-transform`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 truncate">{activity.text}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Join Button */}
            <button className="w-full mt-8 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
              Join Community Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
