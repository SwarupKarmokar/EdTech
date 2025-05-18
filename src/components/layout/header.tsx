import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Menu, X, BookOpen, GraduationCap as Graduation, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { currentUser, notifications } from '../../lib/data';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Graduation className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">EduSpark</span>
          </Link>
          
          <nav className="hidden ml-10 space-x-8 md:flex">
            <Link to="/courses" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Courses
            </Link>
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 top-full mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/category/web-development" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Web Development
                </Link>
                <Link to="/category/design" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Design
                </Link>
                <Link to="/category/data-science" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Data Science
                </Link>
                <Link to="/category/mobile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Mobile Development
                </Link>
                <Link to="/category/cloud" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Cloud Computing
                </Link>
              </div>
            </div>
            <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              My Learning
            </Link>
            <Link to="/discussions" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Discussions
            </Link>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-64 rounded-full border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative rounded-full p-1 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <Bell className="h-6 w-6" />
              {unreadNotifications > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {unreadNotifications}
                </span>
              )}
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                </div>
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                  </div>
                ))}
                <Link
                  to="/notifications"
                  className="block border-t border-gray-100 px-4 py-2 text-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View all notifications
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/profile">
            <Avatar>
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        
        <button
          className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              to="/courses"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            >
              Courses
            </Link>
            <div>
              <button
                className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            <Link
              to="/dashboard"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            >
              My Learning
            </Link>
            <Link
              to="/discussions"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            >
              Discussions
            </Link>
            
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="mt-3 flex items-center space-x-3">
              <Link to="/profile" className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-medium text-gray-700">{currentUser.name}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}