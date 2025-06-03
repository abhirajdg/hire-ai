/*
  # Create Jobs Table for JobHunt Application

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text, job title)
      - `company` (text, company name)
      - `location` (text, job location)
      - `description` (text, detailed job description)
      - `salary_range` (text, optional salary information)
      - `job_type` (text, employment type e.g. Full-time, Part-time)
      - `experience_level` (text, required experience level)
      - `category` (text, job category)
      - `logo_url` (text, optional company logo URL)
      - `application_url` (text, optional application URL)
      - `created_at` (timestamptz, when the job was posted)
      - `featured` (boolean, whether job is featured)
      - `remote` (boolean, whether job allows remote work)

  2. Security
    - Enable RLS on `jobs` table
    - Add policies for public read access
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  salary_range text,
  job_type text NOT NULL,
  experience_level text NOT NULL,
  category text NOT NULL,
  logo_url text,
  application_url text,
  created_at timestamptz DEFAULT now(),
  featured boolean DEFAULT false,
  remote boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to jobs"
  ON jobs
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Insert sample data for testing
INSERT INTO jobs (title, company, location, description, salary_range, job_type, experience_level, category, featured, remote)
VALUES
  (
    'Senior Frontend Developer',
    'TechCorp',
    'San Francisco, CA',
    'We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications using React and TypeScript.\n\nResponsibilities:\n- Develop new user-facing features\n- Build reusable components and libraries for future use\n- Ensure the technical feasibility of UI/UX designs\n- Optimize applications for maximum speed and scalability\n\nRequirements:\n- 5+ years of experience in frontend development\n- Strong proficiency in JavaScript, React, and TypeScript\n- Experience with responsive design\n- Understanding of web accessibility standards',
    '$120,000 - $150,000',
    'Full-time',
    'Senior',
    'Technology',
    true,
    true
  ),
  (
    'UX/UI Designer',
    'DesignStudio',
    'New York, NY',
    'We are seeking a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have a keen eye for clean and artful design, possess superior UI skills, and be able to translate high-level requirements into interaction flows and artifacts.\n\nResponsibilities:\n- Create wireframes, storyboards, user flows, process flows and site maps\n- Design UI elements and build prototypes\n- Conduct user research and evaluate user feedback\n- Establish design guidelines, standards, and best practices\n\nRequirements:\n- 3+ years of UX/UI design experience\n- Proficiency in design tools like Figma, Sketch, Adobe XD\n- Portfolio of design projects\n- Understanding of interaction design and information architecture',
    '$90,000 - $120,000',
    'Full-time',
    'Mid',
    'Design',
    false,
    false
  ),
  (
    'Marketing Manager',
    'GrowthHub',
    'Austin, TX',
    'We are looking for a Marketing Manager to lead our marketing efforts. You will be responsible for developing marketing strategies to increase our brand awareness and drive customer acquisition.\n\nResponsibilities:\n- Develop and implement marketing strategies\n- Manage marketing budget and track KPIs\n- Oversee social media, SEO, and content marketing initiatives\n- Collaborate with sales, product, and design teams\n\nRequirements:\n- 4+ years of experience in marketing\n- Experience with digital marketing channels\n- Strong analytical and project management skills\n- Excellent communication skills',
    '$85,000 - $110,000',
    'Full-time',
    'Mid',
    'Marketing',
    true,
    false
  ),
  (
    'Backend Developer',
    'ServerStack',
    'Remote',
    'We are looking for a Backend Developer to build and maintain our server-side applications. You will be working with our team to develop high-performance, scalable systems.\n\nResponsibilities:\n- Design and implement server-side logic\n- Build efficient database schemas and queries\n- Integrate with front-end components\n- Troubleshoot and debug applications\n\nRequirements:\n- 3+ years of experience in backend development\n- Proficiency in at least one backend language (Node.js, Python, Java, etc.)\n- Experience with databases (SQL, NoSQL)\n- Understanding of server-side templating languages',
    '$100,000 - $130,000',
    'Full-time',
    'Mid',
    'Technology',
    false,
    true
  ),
  (
    'Product Manager',
    'ProductLabs',
    'Chicago, IL',
    'We are seeking an experienced Product Manager to join our team. You will be responsible for the strategy, roadmap, and feature definition for our product line.\n\nResponsibilities:\n- Define the product vision, strategy, and roadmap\n- Work closely with engineering, design, and marketing teams\n- Analyze market data and customer feedback\n- Define product metrics and track performance\n\nRequirements:\n- 5+ years of product management experience\n- Experience with product development methodologies\n- Strong analytical and problem-solving skills\n- Excellent communication and leadership skills',
    '$110,000 - $140,000',
    'Full-time',
    'Senior',
    'Technology',
    true,
    false
  ),
  (
    'Data Scientist',
    'DataInsights',
    'Seattle, WA',
    'We are looking for a Data Scientist to help us discover insights hidden in vast amounts of data. You will mine and analyze data, build models, and communicate findings to stakeholders.\n\nResponsibilities:\n- Develop predictive models and machine-learning algorithms\n- Analyze large datasets to identify trends and patterns\n- Collaborate with product and engineering teams\n- Communicate findings to non-technical stakeholders\n\nRequirements:\n- Masters or PhD in a quantitative field\n- 3+ years of experience in data science\n- Proficiency in Python, R, or similar languages\n- Experience with machine learning frameworks',
    '$120,000 - $150,000',
    'Full-time',
    'Senior',
    'Technology',
    false,
    true
  ),
  (
    'Financial Analyst',
    'FinWise',
    'Boston, MA',
    'We are seeking a Financial Analyst to help with financial planning and analysis. You will prepare financial reports, forecasts, and analyze financial data to help guide business decisions.\n\nResponsibilities:\n- Prepare monthly, quarterly, and annual financial reports\n- Develop financial models and forecasts\n- Analyze variances between actual and planned results\n- Support budgeting and planning processes\n\nRequirements:\n- Bachelors degree in Finance, Accounting, or related field\n- 2+ years of experience in financial analysis\n- Proficiency in Excel and financial modeling\n- Knowledge of accounting principles',
    '$75,000 - $95,000',
    'Full-time',
    'Mid',
    'Finance',
    false,
    false
  ),
  (
    'DevOps Engineer',
    'CloudOps',
    'Remote',
    'We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure. You will work on automating our deployment pipeline and ensuring system reliability.\n\nResponsibilities:\n- Design and implement CI/CD pipelines\n- Manage cloud infrastructure (AWS, GCP, or Azure)\n- Monitor system performance and troubleshoot issues\n- Implement security best practices\n\nRequirements:\n- 3+ years of experience in DevOps or System Administration\n- Experience with cloud platforms (AWS, GCP, or Azure)\n- Knowledge of infrastructure as code tools\n- Understanding of containerization technologies',
    '$100,000 - $130,000',
    'Full-time',
    'Mid',
    'Technology',
    true,
    true
  ),
  (
    'Content Writer',
    'ContentHub',
    'Remote',
    'We are seeking a talented Content Writer to create compelling content for our blog, social media, and website. You will work closely with our marketing team to develop content that engages our audience.\n\nResponsibilities:\n- Write clear, engaging content for various platforms\n- Research industry topics and trends\n- Optimize content for SEO\n- Edit and proofread content\n\nRequirements:\n- 2+ years of experience in content writing\n- Strong writing and editing skills\n- Knowledge of SEO best practices\n- Ability to meet deadlines',
    '$60,000 - $80,000',
    'Full-time',
    'Entry',
    'Marketing',
    false,
    true
  ),
  (
    'Customer Success Manager',
    'ClientFirst',
    'Denver, CO',
    'We are looking for a Customer Success Manager to ensure our customers get the most value from our products and services. You will be responsible for building and maintaining relationships with our customers.\n\nResponsibilities:\n- Onboard new customers and ensure successful product adoption\n- Serve as the primary point of contact for assigned customers\n- Identify upsell and cross-sell opportunities\n- Monitor customer health and address issues\n\nRequirements:\n- 3+ years of experience in customer success or account management\n- Strong communication and interpersonal skills\n- Experience with CRM software\n- Problem-solving mindset',
    '$70,000 - $90,000',
    'Full-time',
    'Mid',
    'Customer Service',
    false,
    false
  );