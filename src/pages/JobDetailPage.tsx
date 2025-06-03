import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/JobsContext';
import { formatDate } from '../utils/dateUtils';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Calendar, 
  Heart, 
  ExternalLink, 
  ArrowLeft, 
  Loader, 
  Share2
} from 'lucide-react';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, savedJobs, saveJob, removeSavedJob } = useJobs();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isSaved = id ? savedJobs.includes(id) : false;

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const jobData = await getJobById(id);
        
        if (!jobData) {
          setError('Job not found');
        } else {
          setJob(jobData);
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, getJobById]);

  const handleSaveToggle = () => {
    if (!id) return;
    
    if (isSaved) {
      removeSavedJob(id);
    } else {
      saveJob(id);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title} at ${job?.company}`,
        url: window.location.href
      })
      .catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Error copying to clipboard:', err));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader className="h-10 w-10 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container-custom py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The job you are looking for does not exist or has been removed.'}</p>
          <button
            onClick={() => navigate('/jobs')}
            className="btn btn-primary"
          >
            Browse All Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container-custom">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Jobs
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 md:p-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center mr-4 shadow-sm overflow-hidden">
                  {job.logo_url ? (
                    <img src={job.logo_url} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-2xl font-bold text-primary-500">
                      {job.company.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
                  <p className="text-lg text-white/90">{job.company}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveToggle}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    isSaved 
                      ? 'bg-white text-primary-600 hover:bg-gray-100' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isSaved ? 'fill-primary-600' : ''}`} />
                  {isSaved ? 'Saved' : 'Save Job'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center px-4 py-2 rounded-md bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <MapPin className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{job.location}</p>
                  {job.remote && <span className="badge badge-teal mt-1">Remote</span>}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <Briefcase className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Type</p>
                  <p className="font-medium text-gray-900">{job.job_type}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium text-gray-900">{job.experience_level}</p>
                </div>
              </div>
            </div>

            {job.salary_range && (
              <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-md">
                <p className="font-medium text-green-800">Salary Range: {job.salary_range}</p>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-700">
                {job.description.split('\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 rounded-lg">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  Posted on {formatDate(job.created_at)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="badge badge-blue">{job.job_type}</span>
                  <span className="badge badge-purple">{job.experience_level}</span>
                  <span className="badge bg-gray-100 text-gray-800">{job.category}</span>
                </div>
              </div>
              
              {job.application_url && (
                <a
                  href={job.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex items-center"
                >
                  Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;