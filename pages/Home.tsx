
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';
import { propertyService } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';

const Home: React.FC = () => {
  const featuredProperties = propertyService.getFeatured();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/beirut/1920/1080" 
            alt="Real Estate Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-lebanese-green/80 via-lebanese-green/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <div className="max-w-2xl animate-fade-in">
            <span className="inline-block bg-lebanese-bronze px-4 py-1.5 rounded text-sm font-bold mb-6 tracking-wider">
              مستشارك العقاري الأول في لبنان
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              ابحث عن <span className="text-lebanese-bronze">منزل أحلامك</span> بلمسة لبنانية عريقة
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed font-light">
              نقدم لك نخبة العقارات والفرص الاستثمارية في أرقى أحياء الضاحية وبيروت، مع ضمان الشفافية والاحترافية الكاملة.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to={AppRoutes.LISTINGS} 
                className="bg-lebanese-bronze hover:bg-white hover:text-lebanese-green px-10 py-4 rounded text-lg font-extrabold transition-all shadow-xl"
              >
                تصفح العقارات
              </Link>
              <Link 
                to={AppRoutes.CONTACT} 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-lebanese-green px-10 py-4 rounded text-lg font-extrabold transition-all"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="bg-lebanese-stone py-16 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 border border-lebanese-bronze/10">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-lebanese-green mb-2">+500</div>
              <div className="text-gray-500 font-bold">عقار مباع</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-lebanese-green mb-2">+15</div>
              <div className="text-gray-500 font-bold">سنة خبرة</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-lebanese-green mb-2">+1000</div>
              <div className="text-gray-500 font-bold">عميل سعيد</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-lebanese-green mb-2">24/7</div>
              <div className="text-gray-500 font-bold">دعم فني</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-lebanese-bronze font-bold text-lg mb-2 block">عقارات مميزة</span>
              <h2 className="text-4xl font-extrabold text-lebanese-green">اكتشف أرقى العروض</h2>
            </div>
            <Link to={AppRoutes.LISTINGS} className="text-lebanese-green font-bold hover:text-lebanese-bronze transition-all flex items-center gap-2 group">
              مشاهدة الكل 
              <span className="group-hover:translate-x-1 transition-transform">←</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-lebanese-green text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-lebanese-bronze/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-6">لماذا تختار عقارات الضاحية؟</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
              نحن نؤمن بأن العقارات ليست مجرد مبانٍ، بل هي استثمار في المستقبل وبناء للحياة.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/5 p-10 rounded-2xl hover:bg-white/10 transition-all border border-white/10 group">
              <div className="w-16 h-16 bg-lebanese-bronze rounded-xl flex items-center justify-center mb-8 text-3xl shadow-lg shadow-lebanese-bronze/20 group-hover:scale-110 transition-transform">
                💎
              </div>
              <h3 className="text-2xl font-bold mb-4">مصداقية تامة</h3>
              <p className="text-white/60 leading-relaxed">
                نلتزم بأعلى معايير الشفافية في كل تعاملاتنا، من التقييم السعري إلى إنهاء المعاملات القانونية.
              </p>
            </div>
            <div className="bg-white/5 p-10 rounded-2xl hover:bg-white/10 transition-all border border-white/10 group">
              <div className="w-16 h-16 bg-lebanese-bronze rounded-xl flex items-center justify-center mb-8 text-3xl shadow-lg shadow-lebanese-bronze/20 group-hover:scale-110 transition-transform">
                📍
              </div>
              <h3 className="text-2xl font-bold mb-4">خبرة محلية</h3>
              <p className="text-white/60 leading-relaxed">
                فريقنا يمتلك معرفة عميقة بسوق الضاحية وبيروت، مما يضمن لك أفضل الفرص الحصرية.
              </p>
            </div>
            <div className="bg-white/5 p-10 rounded-2xl hover:bg-white/10 transition-all border border-white/10 group">
              <div className="w-16 h-16 bg-lebanese-bronze rounded-xl flex items-center justify-center mb-8 text-3xl shadow-lg shadow-lebanese-bronze/20 group-hover:scale-110 transition-transform">
                🤝
              </div>
              <h3 className="text-2xl font-bold mb-4">مواكبة شاملة</h3>
              <p className="text-white/60 leading-relaxed">
                نرافقك في كل خطوة، من المشاهدة الأولى وحتى استلام المفتاح، لتجربة شراء مريحة وسلسة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 bg-lebanese-stone">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-12 rounded-3xl shadow-2xl border-2 border-lebanese-bronze/20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold text-lebanese-green mb-6">هل تبحث عن فرصة استثمارية؟</h2>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
                اترك بياناتك وسيقوم خبيرنا الاستثماري بالتواصل معك لتقديم دراسة شاملة لاحتياجاتك.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <Link 
                  to={AppRoutes.CONTACT} 
                  className="bg-lebanese-green text-white px-12 py-4 rounded-xl font-extrabold text-xl shadow-xl hover:bg-lebanese-bronze transition-all w-full md:w-auto"
                >
                  اطلب استشارة الآن
                </Link>
                <a 
                  href="https://wa.me/96101234567" 
                  className="bg-green-600 text-white px-12 py-4 rounded-xl font-extrabold text-xl shadow-xl hover:bg-green-700 transition-all w-full md:w-auto flex items-center justify-center gap-3"
                >
                  <span>WhatsApp تواصل عبر</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
