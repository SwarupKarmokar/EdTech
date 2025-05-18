import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';
import { Course } from '../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { truncateText } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card hoverable className="h-full flex flex-col overflow-hidden">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="inline-block rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white">
            {course.category}
          </span>
          <span className="ml-2 inline-block rounded-full bg-gray-800 px-2 py-1 text-xs font-medium text-white">
            {course.level}
          </span>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-2 h-12">{course.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 line-clamp-3">
          {truncateText(course.description, 120)}
        </p>
        
        <div className="mt-4 flex items-center">
          <Avatar className="h-6 w-6">
            <AvatarImage src={course.instructor.avatar} />
            <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="ml-2 text-xs text-gray-700">{course.instructor.name}</span>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 pt-4 flex-wrap gap-y-2">
        <div className="flex items-center text-xs text-gray-500 mr-4">
          <Clock className="mr-1 h-3 w-3" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center text-xs text-gray-500 mr-4">
          <Users className="mr-1 h-3 w-3" />
          <span>{course.enrolledStudents.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-xs text-amber-500">
          <Star className="mr-1 h-3 w-3 fill-amber-500" />
          <span className="font-medium">{course.rating}</span>
        </div>
        
        <div className="mt-2 w-full">
          <Link 
            to={`/courses/${course.id}`}
            className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            View Course
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}