export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary_range: string | null;
  job_type: string;
  experience_level: string;
  category: string;
  logo_url: string | null;
  application_url: string | null;
  created_at: string;
  featured: boolean;
  remote: boolean;
}

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';

export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';

export type JobCategory = 
  'Technology' | 
  'Design' | 
  'Marketing' | 
  'Sales' | 
  'Customer Service' | 
  'Finance' | 
  'Healthcare' | 
  'Education' | 
  'Other';

export interface JobFilters {
  search: string;
  category: string;
  jobType: string;
  experienceLevel: string;
  remote: boolean;
}