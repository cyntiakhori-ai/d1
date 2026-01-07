
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../types.ts';
import { SITE_INFO } from '../constants.tsx';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'الرئيسية', path: AppRoutes.HOME },
    { name: 'العقارات', path: AppRoutes.LISTINGS },
    { name: 'عن الشركة', path: AppRoutes.ABOUT },
    { name: 'اتصل بنا', path: AppRoutes.CONTACT },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-lebanese-stone border-b border-lebanese-bronze/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to={AppRoutes.HOME} className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-lebanese-green tracking-tighter">
                عقارات <span className="text-lebanese-bronze">الضاحية</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold transition-all hover:text-lebanese-bronze ${
                  isActive(link.path) ? 'text-lebanese-bronze border-b-2 border-lebanese-bronze' : 'text-lebanese-green'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={AppRoutes.CONTACT}
              className="bg-lebanese-green text-white px-6 py-2.5 rounded shadow-lg hover:bg-lebanese-bronze transition-all font-bold text-sm"
            >
              اطلب استشارة
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-lebanese-green p-2 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-lebanese-stone border-t border-lebanese-bronze/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path) ? 'bg-lebanese-green text-white' : 'text-lebanese-green hover:bg-lebanese-bronze/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to={AppRoutes.CONTACT}
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-lebanese-bronze text-white px-3 py-3 rounded-md font-bold mt-4"
            >
              اطلب استشارة مجانية
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
