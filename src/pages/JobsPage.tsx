import React from 'react';
import { useJobs } from '../contexts/JobsContext';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import { Loader, ChevronLeft, ChevronRight } from 'lucide-react';

const JobsPage: React.FC = () => {
  const { 
    filteredJobs, 
    loading, 
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    totalJobs 
  } = useJobs();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 md:py-12 bg-primary-50 min-h-screen">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-500 mb-2">Available Jobs</h1>
          <p className="text-primary-400">
            Browse through our curated list of active job opportunities
          </p>
        </div>

        <JobFilters />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 text-quantum-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-error-600">{error}</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-card rounded-lg shadow-sm border border-primary-200 p-12 text-center">
            <h3 className="text-xl font-medium text-primary-500 mb-2">No jobs found</h3>
            <p className="text-primary-400 mb-6">
              We couldn't find any jobs matching your criteria. Try adjusting your filters.
            </p>
            <button
              onClick={() => {
                window.location.href = '/jobs';
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-primary-400">
              Showing {filteredJobs.length} of {totalJobs} available {totalJobs === 1 ? 'position' : 'positions'}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} featured={job.featured} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-outline p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Show first page, last page, and pages around current page
                      return (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => {
                      // If there's a gap, show ellipsis
                      if (index > 0 && page - array[index - 1] > 1) {
                        return (
                          <React.Fragment key={`ellipsis-${page}`}>
                            <span className="px-2 text-primary-400">...</span>
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`btn ${
                                currentPage === page
                                  ? 'btn-primary'
                                  : 'btn-outline'
                              } min-w-[40px]`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        );
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`btn ${
                            currentPage === page
                              ? 'btn-primary'
                              : 'btn-outline'
                          } min-w-[40px]`}
                        >
                          {page}
                        </button>
                      );
                    })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-outline p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobsPage;