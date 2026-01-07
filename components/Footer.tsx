
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';
import { SITE_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-lebanese-green text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to={AppRoutes.HOME} className="text-3xl font-extrabold mb-6 block tracking-tighter">
              عقارات <span className="text-lebanese-bronze">الضاحية</span>
            </Link>
            <p className="text-white/70 leading-relaxed mb-6">
              نحن نوفر لك أرقى الحلول العقارية في لبنان، مع التركيز على الجودة والنزاهة والخبرة المحلية العميقة.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-lebanese-bronze">روابط سريعة</h4>
            <ul className="space-y-4">
              <li><Link to={AppRoutes.HOME} className="hover:text-lebanese-bronze transition-all">الرئيسية</Link></li>
              <li><Link to={AppRoutes.LISTINGS} className="hover:text-lebanese-bronze transition-all">تصفح العقارات</Link></li>
              <li><Link to={AppRoutes.ABOUT} className="hover:text-lebanese-bronze transition-all">عن الشركة</Link></li>
              <li><Link to={AppRoutes.CONTACT} className="hover:text-lebanese-bronze transition-all">تواصل معنا</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6 text-lebanese-bronze">تواصل معنا</h4>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-center gap-3">
                <span className="text-lebanese-bronze">📍</span>
                {SITE_INFO.address}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lebanese-bronze">📞</span>
                {SITE_INFO.phone}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lebanese-bronze">✉️</span>
                {SITE_INFO.email}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-lebanese-bronze">النشرة الإخبارية</h4>
            <p className="text-white/70 text-sm mb-4">اشترك ليصلك أحدث العروض الحصرية.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني"
                className="bg-white/10 border border-white/20 px-4 py-2.5 rounded-r outline-none focus:border-lebanese-bronze flex-1 text-sm"
              />
              <button className="bg-lebanese-bronze px-4 py-2.5 rounded-l font-bold hover:bg-white hover:text-lebanese-green transition-all">
                اشترك
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© 2024 عقارات الضاحية. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-all">شروط الخدمة</a>
            <a href="#" className="hover:text-white transition-all">سياسة الخصوصية</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
