import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap as Graduation, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center">
              <Graduation className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">EduSpark</span>
            </Link>
            <p className="mt-4 text-sm">
              Empowering learners worldwide with high-quality education and cutting-edge skills for the digital age.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/courses" className="text-sm text-gray-400 hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/category/web-development" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/category/design" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link to="/category/data-science" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/category/mobile" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link to="/category/cloud" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cloud Computing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Information</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/instructors" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Our Instructors
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Accessibility Statement
                </Link>
              </li>
            </ul>
            
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Subscribe</h3>
              <p className="mt-2 text-sm text-gray-400">Get the latest updates and offers.</p>
              <form className="mt-4 sm:flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="mt-2 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 sm:ml-2 sm:mt-0 sm:w-auto"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} EduSpark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}