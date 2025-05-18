import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  CreditCard, 
  LogOut, 
  Upload, 
  CheckCircle, 
  Award,
  BookOpen,
  Clock
} from 'lucide-react';
import { courses, enrolledCourses, currentUser } from '../lib/data';

export function ProfilePage() {
  const [fullName, setFullName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  
  const completedCourses = enrolledCourses.slice(0, 2);
  const certificates = completedCourses.map(courseId => 
    courses.find(course => course.id === courseId)
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="p-6 text-center border-b border-gray-200">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-lg font-semibold text-gray-900">{currentUser.name}</h2>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
                <button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                  Update Photo
                </button>
              </div>
              
              <div className="p-4">
                <nav className="space-y-1">
                  <a 
                    href="#account" 
                    className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md"
                  >
                    <User className="mr-3 h-5 w-5 text-blue-500" />
                    Account
                  </a>
                  <a 
                    href="#security" 
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <Lock className="mr-3 h-5 w-5 text-gray-400" />
                    Security
                  </a>
                  <a 
                    href="#notifications" 
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <Bell className="mr-3 h-5 w-5 text-gray-400" />
                    Notifications
                  </a>
                  <a 
                    href="#billing" 
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <CreditCard className="mr-3 h-5 w-5 text-gray-400" />
                    Billing
                  </a>
                  <a 
                    href="#certificates" 
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <Award className="mr-3 h-5 w-5 text-gray-400" />
                    Certificates
                  </a>
                  <div className="pt-3 mt-3 border-t border-gray-200">
                    <a 
                      href="#logout" 
                      className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <LogOut className="mr-3 h-5 w-5 text-red-500" />
                      Log Out
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <Tabs defaultValue="account">
              <TabsList className="w-full border-b border-gray-200 mb-6">
                <TabsTrigger value="account" className="pb-3">Account</TabsTrigger>
                <TabsTrigger value="learning" className="pb-3">Learning</TabsTrigger>
                <TabsTrigger value="certificates" className="pb-3">Certificates</TabsTrigger>
                <TabsTrigger value="preferences" className="pb-3">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="(xxx) xxx-xxxx"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          placeholder="City, Country"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={3}
                        placeholder="Tell us about yourself..."
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-4">
                          Upload a new profile photo. The image should be at least 400x400 pixels and less than 2MB in size.
                        </p>
                        
                        <div className="flex space-x-4">
                          <button className="flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </button>
                          <button className="rounded-md bg-white px-4 py-2 text-sm font-medium text-red-600 border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Social Profiles</h3>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                      Add New
                    </button>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2]">
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Facebook</p>
                          <p className="text-xs text-gray-500">Not Connected</p>
                        </div>
                      </div>
                      <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                        Connect
                      </button>
                    </div>
                    
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA1F2]">
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Twitter</p>
                          <p className="text-xs text-gray-500">Connected</p>
                        </div>
                      </div>
                      <button className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors">
                        Disconnect
                      </button>
                    </div>
                    
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2]">
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                          <p className="text-xs text-gray-500">Not Connected</p>
                        </div>
                      </div>
                      <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="learning" className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">My Courses</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {enrolledCourses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {enrolledCourses.map((courseId) => {
                          const course = courses.find((c) => c.id === courseId);
                          if (!course) return null;
                          
                          return (
                            <div key={course.id} className="flex border border-gray-200 rounded-lg overflow-hidden">
                              <div className="w-1/3">
                                <img
                                  src={course.thumbnail}
                                  alt={course.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="w-2/3 p-4">
                                <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{course.title}</h4>
                                <div className="flex items-center mb-2">
                                  <BookOpen className="h-3 w-3 text-gray-500 mr-1" />
                                  <span className="text-xs text-gray-500">{course.duration}</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: courseId === 'course1' ? '33%' : courseId === 'course2' ? '40%' : '10%' }}></div>
                                  </div>
                                  <span className="ml-2 text-xs text-gray-500">{courseId === 'course1' ? '33%' : courseId === 'course2' ? '40%' : '10%'}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No courses yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by enrolling in a course.</p>
                        <div className="mt-6">
                          <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                            Browse Courses
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Learning Statistics</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="rounded-lg border border-gray-200 p-4 text-center">
                        <BookOpen className="mx-auto h-8 w-8 text-blue-600" />
                        <h4 className="mt-2 text-2xl font-bold text-gray-900">{enrolledCourses.length}</h4>
                        <p className="text-sm text-gray-500">Courses</p>
                      </div>
                      
                      <div className="rounded-lg border border-gray-200 p-4 text-center">
                        <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                        <h4 className="mt-2 text-2xl font-bold text-gray-900">2</h4>
                        <p className="text-sm text-gray-500">Completed</p>
                      </div>
                      
                      <div className="rounded-lg border border-gray-200 p-4 text-center">
                        <Clock className="mx-auto h-8 w-8 text-purple-600" />
                        <h4 className="mt-2 text-2xl font-bold text-gray-900">28h</h4>
                        <p className="text-sm text-gray-500">Learning Time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="certificates" className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">My Certificates</h3>
                  </div>
                  <div className="p-6">
                    {certificates.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {certificates.map((course) => {
                          if (!course) return null;
                          
                          return (
                            <div key={course.id} className="rounded-lg border border-gray-200 overflow-hidden">
                              <div className="p-4 border-b border-gray-200 bg-gray-50">
                                <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{course.title}</h4>
                              </div>
                              <div className="p-6 flex flex-col items-center justify-center text-center">
                                <Award className="h-16 w-16 text-amber-500" />
                                <h5 className="mt-4 text-lg font-medium text-gray-900">Certificate of Completion</h5>
                                <p className="text-sm text-gray-500 mt-1">Issued on May 10, 2025</p>
                                <button className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Award className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No certificates yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Complete a course to earn a certificate.</p>
                        <div className="mt-6">
                          <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                            Continue Learning
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Course updates</span>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="course-updates" id="course-updates" defaultChecked className="sr-only peer" />
                        <div className="block h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600"></div>
                        <div className="dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                    
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Discussion replies</span>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="discussion-replies" id="discussion-replies" defaultChecked className="sr-only peer" />
                        <div className="block h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600"></div>
                        <div className="dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                    
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Assignment feedback</span>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="assignment-feedback" id="assignment-feedback" defaultChecked className="sr-only peer" />
                        <div className="block h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600"></div>
                        <div className="dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                    
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Promotional emails</span>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="promotional-emails" id="promotional-emails" className="sr-only peer" />
                        <div className="block h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600"></div>
                        <div className="dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="block text-sm font-medium text-gray-700 mb-2">Theme</span>
                      <div className="flex space-x-4">
                        <label className="relative">
                          <input type="radio" name="theme" value="light" className="sr-only peer" defaultChecked />
                          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md border-2 border-transparent peer-checked:border-blue-600 peer-checked:bg-blue-50">
                            <div className="rounded-md bg-white p-2 shadow-sm border border-gray-200">
                              <div className="h-6 w-10 rounded-sm bg-gray-200"></div>
                            </div>
                            <span className="mt-2 text-xs font-medium">Light</span>
                          </div>
                        </label>
                        
                        <label className="relative">
                          <input type="radio" name="theme" value="dark" className="sr-only peer" />
                          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md border-2 border-transparent peer-checked:border-blue-600 peer-checked:bg-blue-50">
                            <div className="rounded-md bg-gray-800 p-2 shadow-sm border border-gray-700">
                              <div className="h-6 w-10 rounded-sm bg-gray-600"></div>
                            </div>
                            <span className="mt-2 text-xs font-medium">Dark</span>
                          </div>
                        </label>
                        
                        <label className="relative">
                          <input type="radio" name="theme" value="system" className="sr-only peer" />
                          <div className="flex h-20 w-20 flex-col items-center justify-center rounded-md border-2 border-transparent peer-checked:border-blue-600 peer-checked:bg-blue-50">
                            <div className="flex">
                              <div className="rounded-l-md bg-white p-2 shadow-sm border border-gray-200">
                                <div className="h-6 w-5 rounded-sm bg-gray-200"></div>
                              </div>
                              <div className="rounded-r-md bg-gray-800 p-2 shadow-sm border border-gray-700">
                                <div className="h-6 w-5 rounded-sm bg-gray-600"></div>
                              </div>
                            </div>
                            <span className="mt-2 text-xs font-medium">System</span>
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="font-size" className="block text-sm font-medium text-gray-700 mb-2">
                        Font Size
                      </label>
                      <select
                        id="font-size"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>Small</option>
                        <option selected>Medium</option>
                        <option>Large</option>
                        <option>Extra Large</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Language and Region</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        id="language"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option selected>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                        <option>Chinese (Simplified)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>(GMT-08:00) Pacific Time</option>
                        <option>(GMT-07:00) Mountain Time</option>
                        <option>(GMT-06:00) Central Time</option>
                        <option selected>(GMT-05:00) Eastern Time</option>
                        <option>(GMT+00:00) UTC</option>
                        <option>(GMT+01:00) Central European Time</option>
                        <option>(GMT+08:00) China Standard Time</option>
                        <option>(GMT+09:00) Japan Standard Time</option>
                      </select>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}