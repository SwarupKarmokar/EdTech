import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Star, 
  ChevronRight,
  ChevronDown,
  Video,
  FileText,
  BookOpen,
  CheckCircle,
  PlayCircle
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { courses, reactCurriculum, discussions } from '../lib/data';
import { DiscussionCard } from '../components/discussions/discussion-card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { NotFoundPage } from './not-found';

export function CourseDetailsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  
  const course = courses.find((c) => c.id === courseId);
  const curriculum = reactCurriculum; // In a real app, this would be fetched based on courseId
  const courseDiscussions = discussions.filter((d) => d.courseId === courseId);
  
  if (!course) {
    return <NotFoundPage />;
  }
  
  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };
  
  const totalLessons = curriculum.modules.reduce((total, module) => {
    return total + module.lessons.length;
  }, 0);
  
  const completedLessons = curriculum.modules.reduce((total, module) => {
    return total + module.lessons.filter(lesson => lesson.completed).length;
  }, 0);
  
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center text-sm text-blue-100 mb-4">
                <Link to="/courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link to={`/category/${course.category.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors">
                  {course.category}
                </Link>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              
              <p className="text-blue-100 text-lg mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400 mr-1" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-blue-100 ml-1">({course.enrolledStudents} students)</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{course.duration}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs uppercase tracking-wide">
                    {course.level}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
                    Last updated {new Date(course.updated).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                  <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm">Created by</p>
                  <p className="font-medium">{course.instructor.name}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="rounded-md bg-white px-6 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-gray-100 transition-colors">
                  Enroll Now
                </button>
                <button className="rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-white/20 transition-colors">
                  Try for Free
                </button>
              </div>
            </div>
            
            <div className="hidden lg:block relative">
              <div className="relative rounded-xl overflow-hidden border-4 border-white/20 shadow-2xl aspect-video">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="rounded-full bg-blue-600/90 p-4 text-white shadow-lg hover:bg-blue-700 transition-colors">
                    <PlayCircle className="h-12 w-12" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <Tabs defaultValue="overview">
            <TabsList className="w-full flex overflow-x-auto space-x-1 mb-6 bg-transparent">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
                <p className="text-gray-700">
                  {course.description}
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Skill Level</h3>
                    <p className="text-sm text-gray-700 capitalize">{course.level}</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Duration</h3>
                    <p className="text-sm text-gray-700">{course.duration}</p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <p className="text-gray-700">Understand the core concepts of React including components, props, and state</p>
                  </div>
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <p className="text-gray-700">Master React Hooks for functional component state management</p>
                  </div>
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <p className="text-gray-700">Build complete web applications with modern React practices</p>
                  </div>
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <p className="text-gray-700">Implement client-side routing with React Router</p>
                  </div>
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <p className="text-gray-700">Structure your React projects for scalability and maintainability</p>
                  </div>
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <p className="text-gray-700">Deploy your React applications to production environments</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Basic understanding of HTML, CSS, and JavaScript</li>
                  <li>Familiarity with ES6+ syntax is helpful but not required</li>
                  <li>No prior React knowledge needed - we'll start from the basics</li>
                  <li>A computer with Node.js and npm installed</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Who This Course is For</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Web developers looking to add React to their skillset</li>
                  <li>Beginners interested in learning modern front-end development</li>
                  <li>Experienced developers wanting to refresh their React knowledge</li>
                  <li>Anyone building user interfaces for web applications</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
                <div className="text-sm">
                  <span className="font-medium">{completedLessons}</span>/{totalLessons} lessons completed ({progressPercentage}%)
                </div>
              </div>
              
              <div className="space-y-4">
                {curriculum.modules.map((module) => (
                  <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="flex items-center justify-between w-full bg-gray-50 px-6 py-4 text-left"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">
                          {module.lessons.filter(l => l.completed).length}/{module.lessons.length} lessons
                        </span>
                        {expandedModules[module.id] ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    
                    {expandedModules[module.id] && (
                      <div className="border-t border-gray-200 px-6 py-4 space-y-3">
                        {module.lessons.map((lesson, index) => (
                          <Link
                            key={lesson.id}
                            to={`/courses/${curriculum.courseId}/modules/${module.id}/lessons/${lesson.id}`}
                            className={`flex items-center p-3 rounded-md ${
                              lesson.completed ? 'bg-green-50 hover:bg-green-100' : 'hover:bg-gray-50'
                            } transition-colors`}
                          >
                            <div className="flex h-8 w-8 items-center justify-center mr-3">
                              {lesson.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                                  {index + 1}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{lesson.title}</h4>
                              <div className="flex items-center space-x-3 mt-1">
                                <div className="flex items-center text-xs text-gray-500">
                                  {lesson.type === 'video' && <Video className="h-3 w-3 mr-1" />}
                                  {lesson.type === 'reading' && <FileText className="h-3 w-3 mr-1" />}
                                  {lesson.type === 'quiz' && <FileText className="h-3 w-3 mr-1" />}
                                  {lesson.type === 'assignment' && <BookOpen className="h-3 w-3 mr-1" />}
                                  <span className="capitalize">{lesson.type}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <span className={`rounded-md px-2 py-1 text-xs font-medium ${
                                lesson.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {lesson.completed ? 'Completed' : 'Start'}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="instructor" className="space-y-6">
              <div className="flex items-start space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                  <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.instructor.name}</h2>
                  <p className="text-gray-500 mb-4">Senior Web Developer & Educator</p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-amber-400 fill-amber-400 mr-1" />
                      <span className="text-gray-700">4.9 Instructor Rating</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-1" />
                      <span className="text-gray-700">12,450 Students</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-gray-500 mr-1" />
                      <span className="text-gray-700">6 Courses</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">
                    David is a seasoned web developer with over 8 years of experience building production applications with React and JavaScript. He has worked with companies ranging from startups to Fortune 500 enterprises, helping them build scalable and performant front-end architectures.
                  </p>
                  <p className="text-gray-700 mt-4">
                    As an educator, David is passionate about breaking down complex concepts into understandable pieces. His teaching approach focuses on practical, hands-on learning with real-world examples that students can immediately apply to their own projects.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="discussions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Course Discussions</h2>
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                  New Discussion
                </button>
              </div>
              
              <div className="rounded-md border border-gray-200 bg-white p-4">
                <textarea
                  placeholder="Ask a question or start a discussion..."
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={3}
                />
                <div className="mt-4 flex justify-end">
                  <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                    Post
                  </button>
                </div>
              </div>
              
              {courseDiscussions.length > 0 ? (
                <div className="space-y-4">
                  {courseDiscussions.map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No discussions yet. Be the first to start a conversation!</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1 bg-gray-50 rounded-lg p-6 text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">{course.rating}</div>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(course.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 mb-6">Course Rating</p>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <div className="w-8 text-xs text-gray-700">{rating} stars</div>
                        <div className="flex-1 h-2 mx-2 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className="h-full bg-amber-400"
                            style={{
                              width: `${rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '7%' : rating === 2 ? '2%' : '1%'}`
                            }}
                          ></div>
                        </div>
                        <div className="w-8 text-xs text-gray-700">
                          {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '7%' : rating === 2 ? '2%' : '1%'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="col-span-2 space-y-6">
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Sarah Johnson" />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                            <span className="ml-2 text-xs text-gray-500">2 weeks ago</span>
                          </div>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                          <p className="mt-2 text-gray-700">
                            This course exceeded my expectations. The instructor breaks down complex React concepts in a way that's easy to understand. The projects are practical and helped me build my confidence in using React for real-world applications.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Michael Brown" />
                          <AvatarFallback>MB</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-900">Michael Brown</h4>
                            <span className="ml-2 text-xs text-gray-500">1 month ago</span>
                          </div>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="mt-2 text-gray-700">
                            Great course for beginners. The hooks section was particularly well-explained. I would have liked a bit more advanced material towards the end, but overall it was a solid introduction to React.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Jessica Lee" />
                          <AvatarFallback>JL</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-900">Jessica Lee</h4>
                            <span className="ml-2 text-xs text-gray-500">2 months ago</span>
                          </div>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < 5 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="mt-2 text-gray-700">
                            As someone who was struggling with JavaScript, I was worried about learning React. This course gradually builds up your knowledge so that by the end you feel confident in your abilities. The instructor is responsive to questions and the community is helpful.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full rounded-md border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                    Load More Reviews
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}