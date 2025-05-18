export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  duration: string;
  thumbnail: string;
  enrolledStudents: number;
  rating: number;
  price: number;
  tags: string[];
  updated: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  completed: boolean;
  content?: string;
  videoUrl?: string;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Curriculum = {
  courseId: string;
  modules: Module[];
};

export type Progress = {
  courseId: string;
  completed: number;
  total: number;
  lastAccessed: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
};

export type Discussion = {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  createdAt: string;
  replies: Reply[];
  likes: number;
};

export type Reply = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  createdAt: string;
  likes: number;
};

export type Assignment = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
};