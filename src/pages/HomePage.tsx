import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedJobs from '../components/jobs/FeaturedJobs';
import PopularCategories from '../components/home/PopularCategories';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <PopularCategories />
      <FeaturedJobs />
      
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-800 text-white">
        <div className="container-custom">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">Ready to find your dream job?</h2>
              <p className="text-white/80 mb-6 md:mb-0">
                Thousands of opportunities await. Start your job search now and discover the perfect role for your skills and experience.
              </p>
            </div>
            <div className="md:w-1/3 text-center md:text-right">
              <a
                href="/jobs"
                className="inline-block px-6 py-3 bg-white text-secondary-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Browse All Jobs
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;