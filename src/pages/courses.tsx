import React, { useState } from 'react';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { courses } from '../lib/data';
import { CourseCard } from '../components/course/course-card';
import { Course } from '../types';

export function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = [...new Set(courses.map(course => course.category))];
  const levels = [...new Set(courses.map(course => course.level))];
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === '' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedLevel('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Explore Courses</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover a wide range of courses designed to help you acquire new skills and advance your career
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row mb-8 gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700"
          >
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Level</h4>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          name="level"
                          value={level}
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Price Range</h4>
                  <div className="pt-2">
                    <div className="relative mb-4">
                      <div className="absolute left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
                      <div className="absolute left-0 w-2/3 h-1 bg-blue-600 rounded-full"></div>
                      <div className="absolute left-0 top-0 h-5 w-5 -mt-2 -ml-1 rounded-full border-2 border-blue-600 bg-white"></div>
                      <div className="absolute left-2/3 top-0 h-5 w-5 -mt-2 -ml-1 rounded-full border-2 border-blue-600 bg-white"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$0</span>
                      <span>$200</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 flex items-center text-sm text-gray-700">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2">& up</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters - Mobile */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-50">
              <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Level</h4>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <label key={level} className="flex items-center">
                          <input
                            type="radio"
                            name="level"
                            value={level}
                            checked={selectedLevel === level}
                            onChange={() => setSelectedLevel(level)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700 capitalize">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <button
                    onClick={resetFilters}
                    className="flex-1 rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 rounded-md border border-transparent bg-blue-600 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Course List */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredCourses.length}</span> courses
                </p>
              </div>
              
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-700">Sort by:</span>
                <select className="rounded-md border-gray-300 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {filteredCourses.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
                <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No courses found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}