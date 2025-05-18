import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Users, Award, Clock, ArrowRight } from 'lucide-react';
import { courses } from '../lib/data';
import { CourseCard } from '../components/course/course-card';

export function HomePage() {
  const featuredCourses = courses.slice(0, 3);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-24 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 animate-fade-in">
                Unlock Your Potential with Modern Learning
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 animate-fade-in animation-delay-200">
                Discover expert-led courses designed to help you master in-demand skills and advance your career in technology and design.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start animate-fade-in animation-delay-400">
                <Link
                  to="/courses"
                  className="rounded-md bg-white px-6 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-gray-100 transition-colors"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/dashboard"
                  className="rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-white/20 transition-colors"
                >
                  My Dashboard
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
              <div className="absolute bottom-12 -left-10 w-40 h-40 bg-indigo-600 rounded-full opacity-40 blur-2xl"></div>
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-4 border-white/20 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Online learning"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
      </section>
      
      {/* Search Section */}
      <section className="relative -mt-8 container mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="rounded-xl bg-white shadow-lg p-6 md:p-8 transform transition-all">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  className="w-full pl-12 pr-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="md:w-48 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Categories</option>
                <option value="web-development">Web Development</option>
                <option value="design">Design</option>
                <option value="data-science">Data Science</option>
                <option value="mobile">Mobile Development</option>
                <option value="cloud">Cloud Computing</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-medium transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Top Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most popular course categories and find the right path for your learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            <div className="group rounded-xl bg-white p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900">Web Development</h3>
              <p className="mt-1 text-xs text-gray-500">120+ Courses</p>
            </div>
            
            <div className="group rounded-xl bg-white p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 group-hover:bg-green-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900">Design</h3>
              <p className="mt-1 text-xs text-gray-500">85+ Courses</p>
            </div>
            
            <div className="group rounded-xl bg-white p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900">Data Science</h3>
              <p className="mt-1 text-xs text-gray-500">75+ Courses</p>
            </div>
            
            <div className="group rounded-xl bg-white p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 group-hover:bg-amber-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900">Mobile Dev</h3>
              <p className="mt-1 text-xs text-gray-500">60+ Courses</p>
            </div>
            
            <div className="group rounded-xl bg-white p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 group-hover:bg-teal-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900">Cloud Computing</h3>
              <p className="mt-1 text-xs text-gray-500">40+ Courses</p>
            </div>
            
            <div className="group rounded-xl bg-white p-6 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 group-hover:bg-rose-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900">AI & Machine Learning</h3>
              <p className="mt-1 text-xs text-gray-500">30+ Courses</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Top-rated courses curated by our experts to help you get started
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors mt-4 md:mt-0"
            >
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Learn with EduSpark?</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Join millions of learners worldwide and transform your career with our industry-leading platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">600+</h3>
              <p className="text-blue-100">Professional Courses</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">2.5M+</h3>
              <p className="text-blue-100">Active Learners</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">150+</h3>
              <p className="text-blue-100">Expert Instructors</p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">12K+</h3>
              <p className="text-blue-100">Hours of Content</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our community of learners who have transformed their careers through our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Student testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Robert Johnson</h4>
                  <p className="text-sm text-gray-500">Web Developer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The React Fundamentals course was exactly what I needed to level up my skills. The instructor's teaching style made complex concepts easy to understand, and the hands-on projects helped me apply what I learned immediately."
              </p>
              <div className="mt-4 flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Student testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Sarah Williams</h4>
                  <p className="text-sm text-gray-500">UX Designer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As someone transitioning into UX design, the courses on EduSpark were instrumental in helping me build a professional portfolio. The instructor feedback was invaluable, and I landed my first design role within 3 months of completing the courses."
              </p>
              <div className="mt-4 flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Student testimonial"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Michael Brown</h4>
                  <p className="text-sm text-gray-500">Data Scientist</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The Python for Data Science course exceeded my expectations. The curriculum was comprehensive and up-to-date with industry standards. The community support and networking opportunities have been just as valuable as the course content itself."
              </p>
              <div className="mt-4 flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-lg text-purple-100 mb-8">
              Join thousands of students who are already advancing their careers with EduSpark. Get unlimited access to all courses, projects, and more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/courses"
                className="rounded-md bg-white px-8 py-3 text-base font-medium text-purple-700 shadow-sm hover:bg-gray-100 transition-colors"
              >
                Browse Courses
              </Link>
              <Link
                to="/signup"
                className="rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-white/20 transition-colors"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}