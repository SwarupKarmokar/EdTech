import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { discussions, courses } from '../lib/data';
import { DiscussionCard } from '../components/discussions/discussion-card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export function DiscussionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  
  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesSearch = discussion.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         discussion.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === '' || discussion.courseId === selectedCourse;
    
    return matchesSearch && matchesCourse;
  });
  
  const sortedDiscussions = [...filteredDiscussions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Community Discussions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with fellow learners, ask questions, and share your knowledge
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
              
              <div className="space-y-6">
                <div className="mb-4">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      id="search"
                      placeholder="Search discussions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                    Course
                  </label>
                  <select
                    id="course"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Courses</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCourse('');
                    }}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredDiscussions.length} Discussion{filteredDiscussions.length !== 1 ? 's' : ''}
              </h2>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                Start New Discussion
              </button>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Your profile" />
                  <AvatarFallback>YP</AvatarFallback>
                </Avatar>
                
                <div className="ml-3 flex-1">
                  <textarea
                    placeholder="Start a new discussion or ask a question..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                  />
                  
                  <div className="mt-3 flex items-center justify-between">
                    <select className="rounded-md border border-gray-300 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500">
                      <option value="">Select Course (Optional)</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    
                    <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {filteredDiscussions.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-12 shadow-sm text-center">
                <Filter className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No discussions found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCourse('');
                  }}
                  className="mt-6 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedDiscussions.map((discussion) => (
                  <DiscussionCard key={discussion.id} discussion={discussion} />
                ))}
              </div>
            )}
            
            {filteredDiscussions.length > 0 && (
              <div className="flex justify-center">
                <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}