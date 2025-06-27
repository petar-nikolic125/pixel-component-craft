
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  
  const navItems = [
    { name: 'Editor', href: '/editor', isRoute: true },
    { name: 'Features', href: '#features', isRoute: false },
    { name: 'Pricing', href: '#pricing', isRoute: false },
    { name: 'Templates', href: '#templates', isRoute: false },
    { name: 'Docs', href: '#docs', isRoute: false }
  ];

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle navigation click
  const handleNavClick = (item: any, e: React.MouseEvent) => {
    if (!item.isRoute) {
      e.preventDefault();
      const sectionId = item.href.replace('#', '');
      scrollToSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['hero', 'features', 'pricing', 'templates', 'docs'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId === 'hero' ? 'main' : sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (item: any) => {
    if (item.isRoute) {
      return location.pathname === item.href;
    } else {
      const sectionId = item.href.replace('#', '');
      return location.pathname === '/' && activeSection === sectionId;
    }
  };

  return (
    <nav className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ComponentForge
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link 
                  key={item.href} 
                  to={item.href}
                  className={`relative py-2 transition-all duration-200 ${
                    isActive(item) 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transition-all duration-200 ${
                      isActive(item) ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`relative py-2 transition-all duration-200 cursor-pointer ${
                    isActive(item) 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transition-all duration-200 ${
                      isActive(item) ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              )
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/sign-in">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link to="/getting-started">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-xl">
              {navItems.map((item) =>
                item.isRoute ? (
                  <Link 
                    key={item.href} 
                    to={item.href}
                    className={`block px-3 py-2 transition-colors ${
                      isActive(item)
                        ? 'text-purple-400 bg-purple-400/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(item, e)}
                    className={`block px-3 py-2 transition-colors cursor-pointer ${
                      isActive(item)
                        ? 'text-purple-400 bg-purple-400/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </a>
                )
              )}
              <div className="pt-2 space-y-2">
                <Link to="/sign-in">
                  <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/getting-started">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
