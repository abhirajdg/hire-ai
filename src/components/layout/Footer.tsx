import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <img 
                  src="/logo.png" 
                  alt="Hire AI" 
                  className="w-full h-full object-contain invert"
                />
              </div>
              <span className="text-xl font-bold tracking-widest text-primary-50 uppercase">
                Hire AI
              </span>
            </Link>
            <p className="text-sm text-primary-200">
              Intelligent job matching powered by AI, connecting talent with opportunities.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-primary-300 hover:text-primary-50 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary-300 hover:text-primary-50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary-300 hover:text-primary-50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-primary-50 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-300 hover:text-primary-50 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/jobs" className="text-primary-300 hover:text-primary-50 transition-colors">Browse Jobs</Link>
              </li>
              <li>
                <Link to="/saved" className="text-primary-300 hover:text-primary-50 transition-colors">Saved Jobs</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary-50 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs?category=Technology" className="text-primary-300 hover:text-primary-50 transition-colors">Technology</Link>
              </li>
              <li>
                <Link to="/jobs?category=Design" className="text-primary-300 hover:text-primary-50 transition-colors">Design</Link>
              </li>
              <li>
                <Link to="/jobs?category=Marketing" className="text-primary-300 hover:text-primary-50 transition-colors">Marketing</Link>
              </li>
              <li>
                <Link to="/jobs?category=Finance" className="text-primary-300 hover:text-primary-50 transition-colors">Finance</Link>
              </li>
              <li>
                <Link to="/jobs?category=Healthcare" className="text-primary-300 hover:text-primary-50 transition-colors">Healthcare</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary-50 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center text-primary-300">
                <Mail className="h-4 w-4 mr-2" />
                support@hireai.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-10 pt-6 text-sm text-primary-300">
          <p>© 2025 Hire AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;