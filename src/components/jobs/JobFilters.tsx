import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useJobs } from '../../contexts/JobsContext';
import { JobCategory, JobType, ExperienceLevel } from '../../types/job';

const jobCategories: JobCategory[] = [
  'Technology',
  'Design', 
  'Marketing', 
  'Sales', 
  'Customer Service', 
  'Finance', 
  'Healthcare', 
  'Education', 
  'Other'
];

const jobTypes: JobType[] = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship'
];

const experienceLevels: ExperienceLevel[] = [
  'Entry',
  'Mid',
  'Senior',
  'Lead',
  'Executive'
];

const JobFilters: React.FC = () => {
  const { filters, setFilters } = useJobs();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, jobType: e.target.value }));
  };

  const handleExperienceLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, experienceLevel: e.target.value }));
  };

  const handleRemoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, remote: e.target.checked }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      jobType: '',
      experienceLevel: '',
      remote: false,
    });
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Search jobs, companies, or keywords..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <Filter className="h-4 w-4 mr-2" />
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {(filters.category || filters.jobType || filters.experienceLevel || filters.remote) && (
          <button 
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-error-700 bg-error-50 border border-error-200 rounded-md hover:bg-error-100"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </button>
        )}
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="w-full rounded-md border border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filters.category}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {jobCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
              Job Type
            </label>
            <select
              id="jobType"
              className="w-full rounded-md border border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filters.jobType}
              onChange={handleJobTypeChange}
            >
              <option value="">All Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Experience Level
            </label>
            <select
              id="experienceLevel"
              className="w-full rounded-md border border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filters.experienceLevel}
              onChange={handleExperienceLevelChange}
            >
              <option value="">All Levels</option>
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center pt-6">
            <input
              id="remote"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              checked={filters.remote}
              onChange={handleRemoteChange}
            />
            <label htmlFor="remote" className="ml-2 block text-sm text-gray-700">
              Remote Only
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;