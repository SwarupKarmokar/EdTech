import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  PlayCircle,
  Download,
  Share2,
  Bookmark,
  MessageCircle
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { courses, reactCurriculum } from '../lib/data';
import { NotFoundPage } from './not-found';
import { LessonCard } from '../components/course/lesson-card';

export function LessonPage() {
  const { courseId, moduleId, lessonId } = useParams<{ courseId: string; moduleId: string; lessonId: string }>();
  const [completed, setCompleted] = useState(false);
  
  // In a real app, you would fetch this data based on the params
  const course = courses.find((c) => c.id === courseId);
  const curriculum = reactCurriculum;
  
  if (!course || !curriculum) {
    return <NotFoundPage />;
  }
  
  const module = curriculum.modules.find((m) => m.id === moduleId);
  
  if (!module) {
    return <NotFoundPage />;
  }
  
  const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId);
  const lesson = module.lessons[lessonIndex];
  
  if (!lesson) {
    return <NotFoundPage />;
  }
  
  // Calculate next and previous lessons (including across modules)
  const allLessons = curriculum.modules.flatMap((m) => 
    m.lessons.map((l) => ({ ...l, moduleId: m.id }))
  );
  
  const flatLessonIndex = allLessons.findIndex((l) => l.id === lessonId && l.moduleId === moduleId);
  const prevLesson = flatLessonIndex > 0 ? allLessons[flatLessonIndex - 1] : null;
  const nextLesson = flatLessonIndex < allLessons.length - 1 ? allLessons[flatLessonIndex + 1] : null;
  
  // Calculate overall progress
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((l) => l.completed || (l.id === lessonId && completed)).length;
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
  
  const handleComplete = () => {
    setCompleted(!completed);
    // In a real app, you would save this to an API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to={`/courses/${courseId}`} className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                <ChevronLeft className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">Back to Course</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block w-64">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Course Progress</span>
                  <span>{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} />
              </div>
              
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors" onClick={handleComplete}>
                {completed || lesson.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2 mb-6">
                <div className="flex items-center">
                  <span className="capitalize">{lesson.type}</span>
                </div>
                <div>•</div>
                <div>{lesson.duration}</div>
                {(completed || lesson.completed) && (
                  <>
                    <div>•</div>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Completed</span>
                    </div>
                  </>
                )}
              </div>
              
              {lesson.type === 'video' ? (
                <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                  </div>
                  <img
                    src={course.thumbnail}
                    alt={lesson.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
              ) : lesson.type === 'reading' ? (
                <div className="prose prose-blue max-w-none mb-6">
                  <p>
                    This is a reading lesson with detailed content about {lesson.title}. In a real application, this would contain formatted text, images, code samples, and other educational content.
                  </p>
                  <h2>Key Concepts</h2>
                  <ul>
                    <li>Important concept 1</li>
                    <li>Important concept 2</li>
                    <li>Important concept 3</li>
                  </ul>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                  </p>
                </div>
              ) : lesson.type === 'quiz' ? (
                <div className="space-y-6 mb-6">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Question 1</h3>
                    <p className="text-gray-700 mb-4">What is the primary purpose of React's virtual DOM?</p>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="q1" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-2 text-gray-700">To create 3D user interfaces</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="q1" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-2 text-gray-700">To improve performance by minimizing direct DOM manipulation</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="q1" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-2 text-gray-700">To create virtual reality experiences</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="q1" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-2 text-gray-700">To bypass browser security restrictions</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Question 2</h3>
                    <p className="text-gray-700 mb-4">Which hook would you use to perform side effects in a functional component?</p>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="q2" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-2 text-gray-700">useState</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="q2" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-2 text-gray-700">useContext</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="q2" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-2 text-gray-700">useEffect</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="q2" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-2 text-gray-700">useReducer</span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 mb-6">
                  <div className="rounded-lg border border-gray-200 p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Assignment: {lesson.title}</h3>
                    <p className="text-gray-700 mb-4">{lesson.description}</p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Instructions:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                          <li>Create a new React component that implements the concepts covered in this module</li>
                          <li>Your component should demonstrate proper use of state and props</li>
                          <li>Include appropriate error handling and edge cases</li>
                          <li>Submit your code in a GitHub repository or CodeSandbox</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Submission:</h4>
                        <textarea
                          placeholder="Paste your GitHub repository URL or CodeSandbox link here..."
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <Download className="h-4 w-4 mr-1" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <Share2 className="h-4 w-4 mr-1" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <Bookmark className="h-4 w-4 mr-1" />
                    <span>Bookmark</span>
                  </button>
                </div>
                
                <div className="flex space-x-4">
                  {prevLesson && (
                    <Link
                      to={`/courses/${courseId}/modules/${prevLesson.moduleId}/lessons/${prevLesson.id}`}
                      className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      <span>Previous</span>
                    </Link>
                  )}
                  
                  {nextLesson && (
                    <Link
                      to={`/courses/${courseId}/modules/${nextLesson.moduleId}/lessons/${nextLesson.id}`}
                      className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <Tabs defaultValue="notes">
                <TabsList>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="notes" className="mt-4">
                  <textarea
                    placeholder="Take notes for this lesson..."
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={6}
                  />
                  <div className="mt-4 flex justify-end">
                    <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                      Save Notes
                    </button>
                  </div>
                </TabsContent>
                
                <TabsContent value="discussion" className="mt-4">
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex items-center">
                      <MessageCircle className="h-5 w-5 text-gray-400 mr-2" />
                      <h3 className="text-gray-900 font-medium">Lesson Discussion</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Ask questions and discuss this lesson with your instructor and peers
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-4">
                    <div className="flex items-start">
                      <img
                        src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="User"
                        className="h-8 w-8 rounded-full object-cover mr-3"
                      />
                      <div className="flex-1">
                        <div className="rounded-lg bg-gray-50 p-3">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-900">Michael Brown</h4>
                            <span className="text-xs text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            In the video, the instructor mentioned that we should avoid using the index as a key when mapping over arrays. Could someone explain why this is an issue?
                          </p>
                        </div>
                        <div className="flex items-center mt-2 space-x-4 pl-3">
                          <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Reply</button>
                          <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Like</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start pl-8">
                      <img
                        src={course.instructor.avatar}
                        alt="Instructor"
                        className="h-8 w-8 rounded-full object-cover mr-3"
                      />
                      <div className="flex-1">
                        <div className="rounded-lg bg-blue-50 p-3">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {course.instructor.name}
                              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">Instructor</span>
                            </h4>
                            <span className="text-xs text-gray-500">1 day ago</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            Great question! Using the index as a key can cause issues when the list items can change position (due to sorting, filtering, etc.). React uses keys to identify which items have changed, and using indexes can lead to unexpected behavior and performance problems. It's better to use a unique identifier from your data whenever possible.
                          </p>
                        </div>
                        <div className="flex items-center mt-2 space-x-4 pl-3">
                          <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Reply</button>
                          <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Like</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <img
                      src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Your profile"
                      className="h-8 w-8 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <textarea
                        placeholder="Ask a question or join the discussion..."
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows={3}
                      />
                      <div className="mt-2 flex justify-end">
                        <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="resources" className="mt-4">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <h3 className="font-medium text-gray-900 mb-1">Lesson Slides</h3>
                      <p className="text-sm text-gray-500 mb-3">Download the presentation slides from this lesson</p>
                      <a
                        href="#"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                    
                    <div className="rounded-lg border border-gray-200 p-4">
                      <h3 className="font-medium text-gray-900 mb-1">Code Examples</h3>
                      <p className="text-sm text-gray-500 mb-3">Access the code samples demonstrated in this lesson</p>
                      <a
                        href="#"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        <span>Download ZIP</span>
                      </a>
                    </div>
                    
                    <div className="rounded-lg border border-gray-200 p-4">
                      <h3 className="font-medium text-gray-900 mb-1">Additional Reading</h3>
                      <p className="text-sm text-gray-500 mb-3">Explore these resources to deepen your understanding</p>
                      <ul className="space-y-2">
                        <li>
                          <a
                            href="#"
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            React Official Documentation: Hooks at a Glance
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            Understanding UseEffect Hook in Depth
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            Best Practices for React Component Structure
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="sticky top-6">
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h2 className="font-medium text-gray-900">Module: {module.title}</h2>
                </div>
                
                <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="space-y-3">
                    {module.lessons.map((moduleLesson, index) => (
                      <LessonCard
                        key={moduleLesson.id}
                        lesson={{
                          ...moduleLesson,
                          completed: moduleLesson.id === lessonId ? completed || moduleLesson.completed : moduleLesson.completed,
                        }}
                        courseId={courseId}
                        moduleId={moduleId}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}