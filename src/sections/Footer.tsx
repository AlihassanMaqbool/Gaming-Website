import { Gamepad2, Twitter, Youtube, Twitch, Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
}

const Footer = ({ scrollToSection }: FooterProps) => {
  const footerLinks = {
    games: [
      { name: 'All Games', id: 'game-grid' },
      { name: 'New Releases', id: 'latest-games' },
      { name: 'Top Rated', id: 'top-rated' },
      { name: 'Discounts', id: 'discounts' },
    ],
    community: [
      { name: 'Forums', href: '#' },
      { name: 'Discord', href: '#' },
      { name: 'Tournaments', href: '#' },
      { name: 'Leaderboards', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
    company: [
      { name: 'About Us', id: 'about' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Partners', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitch, href: '#', label: 'Twitch' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="relative pt-20 pb-8 border-t border-white/5">
      {/* Background text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[20vw] font-bold text-white/[0.02] leading-none whitespace-nowrap">
          GAMING
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div 
              className="flex items-center gap-2 mb-4 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Game<span className="text-red-500">Verse</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              The ultimate gaming destination. Discover new games, connect with players, 
              and level up your gaming experience.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-400" />
                <span>support@gameverse.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Games Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Games</h3>
            <ul className="space-y-3">
              {footerLinks.games.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.id ? (
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2024 GameVerse. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-red-400 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-red-400 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-red-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
