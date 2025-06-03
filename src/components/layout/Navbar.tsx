import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-card shadow-sm'
          : 'bg-card'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <img 
                src="/logo.png" 
                alt="Hire AI" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-widest text-primary uppercase">
              Hire AI
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors text-primary-500 hover:text-accent ${
                location.pathname === '/' ? 'font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`font-medium transition-colors text-primary-500 hover:text-accent ${
                location.pathname === '/jobs' ? 'font-semibold' : ''
              }`}
            >
              Jobs
            </Link>
            <div className="relative">
              <Link
                to="/jobs"
                className="flex items-center px-4 py-2 rounded-full bg-quantum text-white hover:bg-quantum-600 transition-colors"
              >
                <Search className="h-4 w-4 mr-2" />
                <span>Search Jobs</span>
              </Link>
            </div>
            <Link
              to="/saved"
              className="font-medium transition-colors text-primary-500 hover:text-accent flex items-center"
            >
              <Heart className="h-4 w-4 mr-1" />
              Saved
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-primary-500" />
            ) : (
              <Menu className="h-6 w-6 text-primary-500" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="px-2 py-2 rounded-md text-primary-500 hover:bg-primary-100"
              >
                Home
              </Link>
              <Link
                to="/jobs"
                className="px-2 py-2 rounded-md text-primary-500 hover:bg-primary-100"
              >
                Jobs
              </Link>
              <Link
                to="/saved"
                className="px-2 py-2 rounded-md text-primary-500 hover:bg-primary-100 flex items-center"
              >
                <Heart className="h-4 w-4 mr-1" />
                Saved Jobs
              </Link>
              <Link
                to="/jobs"
                className="px-2 py-2 rounded-md text-primary-500 hover:bg-primary-100 flex items-center"
              >
                <Search className="h-4 w-4 mr-1" />
                Search Jobs
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;