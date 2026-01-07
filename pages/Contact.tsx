
import React from 'react';
import LeadForm from '../components/LeadForm';
import { SITE_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="bg-lebanese-stone min-h-screen">
      <div className="bg-lebanese-green text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold mb-6">اتصل بنا</h1>
          <p className="text-xl text-white/70 max-w-2xl leading-relaxed">فريقنا جاهز للإجابة على جميع استفساراتكم وتقديم المشورة الفنية اللازمة.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Column */}
          <div>
            <h2 className="text-3xl font-extrabold text-lebanese-green mb-12">معلومات التواصل</h2>
            
            <div className="space-y-12">
              <div className="flex gap-6 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl group-hover:bg-lebanese-bronze group-hover:text-white transition-all">📍</div>
                <div>
                  <h4 className="text-xl font-bold text-lebanese-green mb-2">مكتبنا الرئيسي</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">{SITE_INFO.address}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl group-hover:bg-lebanese-bronze group-hover:text-white transition-all">📞</div>
                <div>
                  <h4 className="text-xl font-bold text-lebanese-green mb-2">أرقام التواصل</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">{SITE_INFO.phone}</p>
                  <a href={SITE_INFO.whatsapp} className="text-green-600 font-bold hover:underline">تحدث معنا عبر واتساب</a>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl group-hover:bg-lebanese-bronze group-hover:text-white transition-all">✉️</div>
                <div>
                  <h4 className="text-xl font-bold text-lebanese-green mb-2">البريد الإلكتروني</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">{SITE_INFO.email}</p>
                  <p className="text-sm text-gray-400">سوف نقوم بالرد خلال ساعة عمل واحدة.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl h-80 grayscale hover:grayscale-0 transition-all border border-lebanese-bronze/10">
              {/* Map Placeholder */}
              <img 
                src="https://picsum.photos/seed/map/800/600" 
                className="w-full h-full object-cover" 
                alt="Office Location Map" 
              />
              <div className="absolute inset-0 bg-lebanese-green/10 flex items-center justify-center pointer-events-none">
                 <span className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full font-bold text-lebanese-green shadow-xl border border-lebanese-bronze/20">📍 مكتبنا في قلب الضاحية</span>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div>
            <LeadForm title="أرسل لنا استفسارك وسنعاود الاتصال بك" />
            
            <div className="mt-8 p-8 bg-lebanese-bronze/5 rounded-2xl border border-dashed border-lebanese-bronze/30">
              <h4 className="font-bold text-lebanese-green mb-2">ساعات العمل</h4>
              <ul className="text-gray-600 space-y-1">
                <li className="flex justify-between"><span>الإثنين - الجمعة:</span> <span className="font-bold">9:00 ص - 6:00 م</span></li>
                <li className="flex justify-between"><span>السبت:</span> <span className="font-bold">9:00 ص - 2:00 م</span></li>
                <li className="flex justify-between text-red-500 font-bold"><span>الأحد:</span> <span>عطلة رسمية</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
