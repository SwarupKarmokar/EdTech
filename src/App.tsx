import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { HomePage } from './pages/home';
import { CoursesPage } from './pages/courses';
import { CourseDetailsPage } from './pages/course-details';
import { DashboardPage } from './pages/dashboard';
import { LessonPage } from './pages/lesson';
import { DiscussionsPage } from './pages/discussions';
import { ProfilePage } from './pages/profile';
import { NotFoundPage } from './pages/not-found';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:courseId" element={<CourseDetailsPage />} />
          <Route path="courses/:courseId/modules/:moduleId/lessons/:lessonId" element={<LessonPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="discussions" element={<DiscussionsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;