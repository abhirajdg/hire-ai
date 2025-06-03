import React from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../contexts/JobsContext';
import JobCard from './JobCard';
import { ArrowRight, Loader } from 'lucide-react';

const FeaturedJobs: React.FC = () => {
  const { featuredJobs, loading, error } = useJobs();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-error-600">{error}</p>
      </div>
    );
  }

  if (featuredJobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No featured jobs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
          <Link to="/jobs" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
            View All Jobs <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.slice(0, 3).map(job => (
            <JobCard key={job.id} job={job} featured={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedJobs;