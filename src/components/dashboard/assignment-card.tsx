import React from 'react';
import { Link } from 'react-router-dom';
import { Assignment, Course } from '../../types';
import { formatDate } from '../../lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Clock, AlertCircle, CheckCircle, Edit3, XCircle } from 'lucide-react';

interface AssignmentCardProps {
  assignment: Assignment;
  course: Course | undefined;
}

export function AssignmentCard({ assignment, course }: AssignmentCardProps) {
  const getStatusDetails = () => {
    switch (assignment.status) {
      case 'not_started':
        return {
          icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
          label: 'Not Started',
          color: 'bg-amber-100 text-amber-800',
        };
      case 'in_progress':
        return {
          icon: <Edit3 className="h-4 w-4 text-blue-500" />,
          label: 'In Progress',
          color: 'bg-blue-100 text-blue-800',
        };
      case 'submitted':
        return {
          icon: <CheckCircle className="h-4 w-4 text-purple-500" />,
          label: 'Submitted',
          color: 'bg-purple-100 text-purple-800',
        };
      case 'graded':
        return {
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          label: 'Graded',
          color: 'bg-green-100 text-green-800',
        };
      default:
        return {
          icon: <XCircle className="h-4 w-4 text-gray-500" />,
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800',
        };
    }
  };

  const statusDetails = getStatusDetails();
  const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status !== 'submitted' && assignment.status !== 'graded';

  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{assignment.title}</CardTitle>
          <div className={`rounded-md px-2 py-1 text-xs font-medium flex items-center ${statusDetails.color}`}>
            {statusDetails.icon}
            <span className="ml-1">{statusDetails.label}</span>
          </div>
        </div>
        {course && (
          <Link to={`/courses/${course.id}`} className="text-xs text-blue-600 hover:underline">
            {course.title}
          </Link>
        )}
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {assignment.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs">
            <Clock className="mr-1 h-3 w-3 text-gray-500" />
            <span className={`${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
              {isOverdue ? 'Overdue: ' : 'Due: '}{formatDate(assignment.dueDate)}
            </span>
          </div>
          
          <Link
            to={`/courses/${assignment.courseId}/assignments/${assignment.id}`}
            className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
          >
            {assignment.status === 'not_started' 
              ? 'Start' 
              : assignment.status === 'in_progress' 
                ? 'Continue' 
                : assignment.status === 'submitted' 
                  ? 'View Submission' 
                  : 'View Feedback'}
          </Link>
        </div>
        
        {assignment.status === 'graded' && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Grade:</span>
              <span className="text-sm font-semibold">{assignment.grade}/100</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}