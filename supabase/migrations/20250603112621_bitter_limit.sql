/*
  # Create view for jobs with application URLs
  
  1. New View
    - Creates a view `jobs_with_applications` that only includes jobs with valid application URLs
    
  2. Security
    - Enable RLS on the view
    - Add policy for public read access
*/

-- Create the view for jobs with application URLs
CREATE VIEW jobs_with_applications AS
SELECT *
FROM jobs
WHERE application_url IS NOT NULL
  AND application_url != '';

-- Enable RLS on the view
ALTER VIEW jobs_with_applications SET (security_invoker = true);

-- Grant access to the view
GRANT SELECT ON jobs_with_applications TO anon, authenticated;