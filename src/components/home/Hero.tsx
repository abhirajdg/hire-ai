import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, MapPin, TrendingUp } from 'lucide-react';
import { useJobs } from '../../contexts/JobsContext';

const Hero: React.FC = () => {
  const { jobs } = useJobs();
  const categories = [...new Set(jobs.map(job => job.category))];
  const companyCount = [...new Set(jobs.map(job => job.company))].length;

  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-accent-600 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }} />
      </div>

      <div className="container-custom relative pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Discover thousands of job opportunities with top employers. Your next career move starts here.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-20 py-4 bg-white text-gray-900 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Search jobs, keywords, companies..."
            />
            <Link
              to="/jobs"
              className="absolute right-2 top-2 bottom-2 px-4 bg-primary-600 text-white font-medium rounded-md flex items-center hover:bg-primary-700 transition-colors"
            >
              Search
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Briefcase className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-1">{jobs.length}+ Jobs</h3>
            <p className="text-white/70">Ready for your next opportunity</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-1">{categories.length} Categories</h3>
            <p className="text-white/70">Find your perfect fit</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-1">{companyCount}+ Companies</h3>
            <p className="text-white/70">Top employers hiring now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;