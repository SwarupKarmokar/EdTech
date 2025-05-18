import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '../ui/progress';
import { Course, Progress as ProgressType } from '../../types';
import { formatDate, calculateProgress } from '../../lib/utils';

interface ProgressSectionProps {
  courses: Course[];
  progress: ProgressType[];
}

export function ProgressSection({ courses, progress }: ProgressSectionProps) {
  // Get courses with progress data
  const coursesWithProgress = progress.map(prog => {
    const course = courses.find(c => c.id === prog.courseId);
    return {
      ...prog,
      course: course || null,
      progressPercentage: calculateProgress(prog.completed, prog.total)
    };
  }).filter(item => item.course !== null);

  // Sort by last accessed
  const sortedCourses = [...coursesWithProgress].sort((a, b) => 
    new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">My Progress</h2>
      
      {sortedCourses.length === 0 ? (
        <div className="mt-6 text-center py-8">
          <p className="text-gray-500">You haven't started any courses yet.</p>
          <Link 
            to="/courses" 
            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {sortedCourses.map((item) => (
            <div key={item.courseId} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{item.course?.title}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>Last accessed: {formatDate(item.lastAccessed)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{item.course?.duration}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to={`/courses/${item.courseId}`}
                  className="rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 transition-colors"
                >
                  Continue
                </Link>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">
                    {item.completed} of {item.total} lessons completed
                  </span>
                  <span className="font-medium text-blue-600">{item.progressPercentage}%</span>
                </div>
                <Progress value={item.progressPercentage} className="mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}