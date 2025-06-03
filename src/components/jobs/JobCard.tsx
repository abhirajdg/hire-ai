import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Heart, Building2 } from 'lucide-react';
import { Job } from '../../types/job';
import { useJobs } from '../../contexts/JobsContext';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, featured = false }) => {
  const { savedJobs, saveJob, removeSavedJob } = useJobs();
  const isSaved = savedJobs.includes(job.id);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSaved) {
      removeSavedJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  return (
    <Link 
      to={`/jobs/${job.id}`}
      className={`group block card p-6 hover:border-primary-300 transition-all duration-200 animate-fade-in ${
        featured ? 'border-l-4 border-l-accent-500' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div 
            className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4 overflow-hidden border border-gray-200 group-hover:border-primary-200 transition-colors"
          >
            {job.logo_url ? (
              <img 
                src={job.logo_url} 
                alt={`${job.company} logo`} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<div class="text-lg font-bold text-gray-400">${job.company.charAt(0)}</div>`;
                }}
              />
            ) : (
              <Building2 className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>
        <button 
          onClick={toggleSave}
          className="group/save p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              isSaved 
                ? 'text-error-500 fill-error-500' 
                : 'text-gray-400 group-hover/save:text-gray-600'
            }`} 
          />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="badge badge-blue">{job.job_type}</span>
        <span className="badge badge-purple">{job.experience_level}</span>
        {job.remote && <span className="badge badge-teal">Remote</span>}
        {featured && <span className="badge bg-accent-100 text-accent-800">Featured</span>}
      </div>

      <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatDistanceToNow(job.created_at)}</span>
        </div>
      </div>

      {job.salary_range && (
        <div className="mt-3 text-sm font-medium text-primary-700">
          {job.salary_range}
        </div>
      )}
    </Link>
  );
};

export default JobCard;