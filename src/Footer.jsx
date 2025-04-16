import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="ConfMap Logo" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-600">
              Discover and share scientific events worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-600 hover:text-primary">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/map" className="text-gray-600 hover:text-primary">
                  Event Map
                </NavLink>
              </li>
              <li>
                <NavLink to="/calender" className="text-gray-600 hover:text-primary">
                  Calendar
                </NavLink>
              </li>
              <li>
                <NavLink to="/post-event" className="text-gray-600 hover:text-primary">
                  Post Event
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/legal" className="text-gray-600 hover:text-primary">
                  Terms of Use
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy" className="text-gray-600 hover:text-primary">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/cookie" className="text-gray-600 hover:text-primary">
                  Cookie Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-gray-600 hover:text-primary">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-gray-600">
              ConfMap helps researchers and enthusiasts find and share scientific events across the globe using interactive maps and smart filters.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ConfMap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
