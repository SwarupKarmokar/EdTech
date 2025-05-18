import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { courses, enrolledCourses, progress, assignments, currentUser } from '../lib/data';
import { ProgressSection } from '../components/dashboard/progress-section';
import { AssignmentCard } from '../components/dashboard/assignment-card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { BookOpen, Calendar, Trophy, Clock, Target, BarChart } from 'lucide-react';

export function DashboardPage() {
  const userCourses = courses.filter((course) => 
    enrolledCourses.includes(course.id)
  );
  
  const userAssignments = assignments.filter((assignment) =>
    enrolledCourses.includes(assignment.courseId)
  );
  
  const upcomingAssignments = userAssignments
    .filter((assignment) => 
      assignment.status !== 'graded' && new Date(assignment.dueDate) > new Date()
    )
    .sort((a, b) => 
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    .slice(0, 3);
  
  // Calculate overall progress
  const totalCompleted = progress.reduce((sum, p) => sum + p.completed, 0);
  const totalLessons = progress.reduce((sum, p) => sum + p.total, 0);
  const overallProgress = totalLessons > 0 
    ? Math.round((totalCompleted / totalLessons) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Avatar className="h-14 w-14">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
              <p className="text-gray-600">Track your progress and continue your learning journey</p>
            </div>
          </div>
          
          <Link
            to="/courses"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Explore More Courses
          </Link>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Enrolled Courses</h3>
                <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Overall Progress</h3>
                <p className="text-2xl font-bold text-gray-900">{overallProgress}%</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Learning Hours</h3>
                <p className="text-2xl font-bold text-gray-900">28h</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Certificates</h3>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProgressSection courses={courses} progress={progress} />
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <Tabs defaultValue="upcoming">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Assignments</h2>
                  <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="upcoming">
                  {upcomingAssignments.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No upcoming assignments.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingAssignments.map((assignment) => (
                        <AssignmentCard
                          key={assignment.id}
                          assignment={assignment}
                          course={courses.find(c => c.id === assignment.courseId)}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userAssignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        course={courses.find(c => c.id === assignment.courseId)}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Activity</h2>
              <div className="h-64 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart className="h-48 w-48 text-gray-200" />
                  <p className="absolute text-gray-500 text-sm">Activity data visualization would appear here</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Calendar</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">June 2025</h3>
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {/* Week 1 */}
                  <div className="text-gray-400 p-2 text-center">30</div>
                  <div className="text-gray-400 p-2 text-center">31</div>
                  <div className="p-2 text-center">1</div>
                  <div className="p-2 text-center">2</div>
                  <div className="p-2 text-center">3</div>
                  <div className="p-2 text-center">4</div>
                  <div className="p-2 text-center">5</div>
                  
                  {/* Week 2 */}
                  <div className="p-2 text-center">6</div>
                  <div className="p-2 text-center">7</div>
                  <div className="p-2 text-center">8</div>
                  <div className="p-2 text-center">9</div>
                  <div className="p-2 text-center relative">
                    10
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full bg-blue-600"></div>
                  </div>
                  <div className="p-2 text-center">11</div>
                  <div className="p-2 text-center">12</div>
                  
                  {/* Week 3 */}
                  <div className="p-2 text-center">13</div>
                  <div className="p-2 text-center">14</div>
                  <div className="p-2 text-center">15</div>
                  <div className="rounded-full bg-blue-600 text-white p-2 text-center">16</div>
                  <div className="p-2 text-center">17</div>
                  <div className="p-2 text-center">18</div>
                  <div className="p-2 text-center">19</div>
                  
                  {/* Week 4 */}
                  <div className="p-2 text-center">20</div>
                  <div className="p-2 text-center relative">
                    21
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full bg-red-600"></div>
                  </div>
                  <div className="p-2 text-center">22</div>
                  <div className="p-2 text-center">23</div>
                  <div className="p-2 text-center">24</div>
                  <div className="p-2 text-center">25</div>
                  <div className="p-2 text-center">26</div>
                  
                  {/* Week 5 */}
                  <div className="p-2 text-center">27</div>
                  <div className="p-2 text-center">28</div>
                  <div className="p-2 text-center">29</div>
                  <div className="p-2 text-center">30</div>
                  <div className="text-gray-400 p-2 text-center">1</div>
                  <div className="text-gray-400 p-2 text-center">2</div>
                  <div className="text-gray-400 p-2 text-center">3</div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium text-gray-900 mb-2">Upcoming Events</h3>
                
                <div className="flex items-center p-3 rounded-md border border-blue-100 bg-blue-50">
                  <div className="rounded-full bg-blue-600 text-white w-10 h-10 flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Live Q&A Session</h4>
                    <p className="text-xs text-gray-500">June 16, 2025 • 3:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-md border border-red-100 bg-red-50">
                  <div className="rounded-full bg-red-600 text-white w-10 h-10 flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Assignment Deadline</h4>
                    <p className="text-xs text-gray-500">June 21, 2025 • 11:59 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommendations</h2>
              
              <div className="space-y-4">
                {courses.slice(2, 5).map((course) => (
                  <div key={course.id} className="flex items-start">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-16 w-24 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{course.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{course.instructor.name}</p>
                      <div className="mt-2">
                        <Link
                          to={`/courses/${course.id}`}
                          className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link
                to="/courses"
                className="mt-6 block text-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                View More Recommendations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}