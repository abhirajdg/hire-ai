import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job, JobFilters } from '../types/job';
import supabase from '../lib/supabase';

interface JobsContextType {
  jobs: Job[];
  featuredJobs: Job[];
  loading: boolean;
  error: string | null;
  filters: JobFilters;
  setFilters: React.Dispatch<React.SetStateAction<JobFilters>>;
  filteredJobs: Job[];
  getJobById: (id: string) => Promise<Job | null>;
  saveJob: (jobId: string) => void;
  savedJobs: string[];
  removeSavedJob: (jobId: string) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalJobs: number;
}

const defaultFilters: JobFilters = {
  search: '',
  category: '',
  jobType: '',
  experienceLevel: '',
  remote: false,
};

const JOBS_PER_PAGE = 50;

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch jobs from both tables
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        // Calculate the range for pagination
        const start = (currentPage - 1) * JOBS_PER_PAGE;
        const end = start + JOBS_PER_PAGE - 1;

        // Fetch regular jobs with count
        const { data: regularJobs, error: regularJobsError, count: regularCount } = await supabase
          .from('jobs')
          .select('*', { count: 'exact' })
          .range(start, end)
          .order('created_at', { ascending: false });

        if (regularJobsError) throw regularJobsError;

        // Fetch job alerts
        const { data: alertJobs, error: alertsError, count: alertCount } = await supabase
          .from('job_alerts')
          .select('*', { count: 'exact' })
          .range(start, end)
          .order('created_at', { ascending: false });

        if (alertsError) throw alertsError;

        // Transform job alerts to match Job type
        const transformedAlertJobs = alertJobs?.map(alert => ({
          id: `alert-${alert.id}`,
          title: alert['Job Title']?.toString() || 'Untitled Position',
          company: 'Company Name',
          location: alert['Job Location']?.toString() || 'Location not specified',
          description: alert['Job Description']?.toString() || '',
          job_type: 'Full-time',
          experience_level: 'Not specified',
          category: 'Technology',
          application_url: alert['Job Link']?.toString() || null,
          created_at: alert.created_at,
          featured: false,
          remote: false,
          salary_range: null,
          logo_url: null
        })) || [];

        // Combine and sort all jobs
        const allJobs = [...(regularJobs || []), ...transformedAlertJobs];
        const sortedJobs = allJobs.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        setJobs(sortedJobs);
        setFeaturedJobs(sortedJobs.filter(job => job.featured));
        setTotalJobs((regularCount || 0) + (alertCount || 0));

      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentPage, filters]); // Add filters to dependencies to refetch when filters change

  // Save to localStorage when savedJobs changes
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  // Filter jobs based on current filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !filters.search || 
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = !filters.category || job.category === filters.category;
    const matchesJobType = !filters.jobType || job.job_type === filters.jobType;
    const matchesExperienceLevel = !filters.experienceLevel || job.experience_level === filters.experienceLevel;
    const matchesRemote = !filters.remote || job.remote === filters.remote;

    return matchesSearch && matchesCategory && matchesJobType && 
           matchesExperienceLevel && matchesRemote;
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

  // Get a specific job by ID
  const getJobById = async (id: string): Promise<Job | null> => {
    try {
      if (id.startsWith('alert-')) {
        const alertId = id.replace('alert-', '');
        const { data, error } = await supabase
          .from('job_alerts')
          .select('*')
          .eq('id', alertId)
          .single();

        if (error) throw error;
        if (!data) return null;

        return {
          id: `alert-${data.id}`,
          title: data['Job Title']?.toString() || 'Untitled Position',
          company: 'Company Name',
          location: data['Job Location']?.toString() || 'Location not specified',
          description: data['Job Description']?.toString() || '',
          job_type: 'Full-time',
          experience_level: 'Not specified',
          category: 'Technology',
          application_url: data['Job Link']?.toString() || null,
          created_at: data.created_at,
          featured: false,
          remote: false,
          salary_range: null,
          logo_url: null
        };
      }

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching job:', err);
      setError('Failed to fetch job details. Please try again later.');
      return null;
    }
  };

  const saveJob = (jobId: string) => {
    if (!savedJobs.includes(jobId)) {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const removeSavedJob = (jobId: string) => {
    setSavedJobs(savedJobs.filter(id => id !== jobId));
  };

  return (
    <JobsContext.Provider value={{
      jobs,
      featuredJobs,
      loading,
      error,
      filters,
      setFilters,
      filteredJobs,
      getJobById,
      saveJob,
      savedJobs,
      removeSavedJob,
      currentPage,
      setCurrentPage,
      totalPages,
      totalJobs,
    }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};