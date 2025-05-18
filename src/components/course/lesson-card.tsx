import React from 'react';
import { Link } from 'react-router-dom';
import { Play, FileText, CheckCircle, Clock, BookOpen, FileQuestion } from 'lucide-react';
import { Lesson } from '../../types';

interface LessonCardProps {
  lesson: Lesson;
  courseId: string;
  moduleId: string;
  index: number;
}

export function LessonCard({ lesson, courseId, moduleId, index }: LessonCardProps) {
  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'reading':
        return <FileText className="h-4 w-4 text-teal-600" />;
      case 'quiz':
        return <FileQuestion className="h-4 w-4 text-amber-600" />;
      case 'assignment':
        return <BookOpen className="h-4 w-4 text-purple-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Link
      to={`/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`}
      className={`group relative flex items-center rounded-md border p-4 ${
        lesson.completed
          ? 'border-green-100 bg-green-50'
          : 'border-gray-200 bg-white hover:border-blue-100 hover:bg-blue-50'
      } transition-colors duration-200`}
    >
      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
        {lesson.completed ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
            {index + 1}
          </span>
        )}
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
          {lesson.title}
        </h4>
        <div className="mt-1 flex items-center space-x-4">
          <div className="flex items-center text-xs text-gray-500">
            {getLessonIcon(lesson.type)}
            <span className="ml-1 capitalize">{lesson.type}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="mr-1 h-3 w-3" />
            <span>{lesson.duration}</span>
          </div>
        </div>
      </div>
      
      <div className="ml-4">
        <div className={`rounded-md px-2 py-1 text-xs font-medium ${
            lesson.completed
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {lesson.completed ? 'Completed' : 'Continue'}
        </div>
      </div>
    </Link>
  );
}