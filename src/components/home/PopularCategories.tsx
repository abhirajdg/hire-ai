import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  PenTool, 
  BarChart, 
  ShoppingCart, 
  HeadphonesIcon, 
  LineChart, 
  Stethoscope, 
  GraduationCap
} from 'lucide-react';

const categories = [
  { 
    name: 'Technology', 
    icon: Code, 
    color: 'bg-blue-100 text-blue-600',
    count: '10+'
  },
  { 
    name: 'Design', 
    icon: PenTool, 
    color: 'bg-purple-100 text-purple-600',
    count: '10+'
  },
  { 
    name: 'Marketing', 
    icon: BarChart, 
    color: 'bg-green-100 text-green-600',
    count: '10+'
  },
  { 
    name: 'Sales', 
    icon: ShoppingCart, 
    color: 'bg-red-100 text-red-600',
    count: '10+'
  },
  { 
    name: 'Customer Service', 
    icon: HeadphonesIcon, 
    color: 'bg-yellow-100 text-yellow-600',
    count: '10+'
  },
  { 
    name: 'Finance', 
    icon: LineChart, 
    color: 'bg-indigo-100 text-indigo-600',
    count: '10+'
  },
  { 
    name: 'Healthcare', 
    icon: Stethoscope, 
    color: 'bg-pink-100 text-pink-600',
    count: '10+'
  },
  { 
    name: 'Education', 
    icon: GraduationCap, 
    color: 'bg-teal-100 text-teal-600',
    count: '10+'
  }
];

const PopularCategories: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse Popular Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore job opportunities by industry category and find the perfect role that matches your expertise and career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.name}
                to={`/jobs?category=${category.name}`}
                className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className={`p-3 rounded-full ${category.color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.count} jobs available
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;