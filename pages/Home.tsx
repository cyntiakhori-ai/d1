
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes, SiteSettings, Property } from '../types.ts';
import { propertyService } from '../services/propertyService.ts';
import { cmsService } from '../services/cmsService.ts';
import PropertyCard from '../components/PropertyCard.tsx';

const Home: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [fetchedSettings, fetchedProps] = await Promise.all([
        cmsService.getSettings(),
        propertyService.getFeatured()
      ]);
      setSettings(fetchedSettings);
      setFeaturedProperties(fetchedProps);
      cmsService.applySettings(fetchedSettings);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lebanese-stone">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-lebanese-bronze border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-lebanese-green font-black">جاري تحميل عقارات الضاحية...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={settings.heroImage} 
            alt="Real Estate Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent" style={{ backgroundImage: `linear-gradient(to left, ${settings.primaryColor}CC, ${settings.primaryColor}99, transparent)` }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white text-right">
          <div className="max-w-3xl animate-fade-in">
            <span className="inline-block bg-lebanese-bronze px-4 py-1.5 rounded text-sm font-bold mb-6 tracking-wider shadow-lg">
              مستشارك العقاري الأول في لبنان
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              {settings.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed font-light">
              {settings.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to={AppRoutes.LISTINGS} 
                className="bg-lebanese-bronze hover:bg-white hover:text-lebanese-green px-12 py-5 rounded-2xl text-lg font-black transition-all shadow-2xl transform hover:scale-105"
              >
                تصفح العقارات
              </Link>
              <Link 
                to={AppRoutes.CONTACT} 
                className="bg-transparent border-2 border-white hover:bg-white hover:text-lebanese-green px-12 py-5 rounded-2xl text-lg font-black transition-all"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="bg-lebanese-stone py-16 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-12 border border-lebanese-bronze/5">
            {[
              { val: '+500', label: 'عقار مباع' },
              { val: '+15', label: 'سنة خبرة' },
              { val: '+1000', label: 'عميل سعيد' },
              { val: '24/7', label: 'دعم فني' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-black text-lebanese-green mb-3">{stat.val}</div>
                <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
            <div className="text-center md:text-right">
              <span className="text-lebanese-bronze font-black text-lg mb-4 block">عقارات مختارة بعناية</span>
              <h2 className="text-5xl font-black text-lebanese-green">استكشف أرقى العروض</h2>
            </div>
            <Link to={AppRoutes.LISTINGS} className="text-lebanese-green font-black hover:text-lebanese-bronze transition-all flex items-center gap-3 text-lg group">
              مشاهدة الكل 
              <span className="group-hover:translate-x-[-10px] transition-transform font-serif text-2xl">←</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProperties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter/Contact CTA */}
      <section className="py-32 bg-lebanese-stone">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-lebanese-green p-16 md:p-24 rounded-[4rem] shadow-2xl text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-lebanese-bronze/10 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform group-hover:scale-150 duration-1000"></div>
            <div className="relative z-10">
              <h2 className="text-5xl font-black text-white mb-8">هل تبحث عن فرصة استثمارية؟</h2>
              <p className="text-white/70 mb-14 text-xl leading-relaxed max-w-3xl mx-auto font-light">
                اترك بياناتك وسيقوم خبيرنا الاستثماري بالتواصل معك لتقديم دراسة شاملة لاحتياجاتك العقارية في لبنان.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <Link 
                  to={AppRoutes.CONTACT} 
                  className="bg-white text-lebanese-green px-14 py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-lebanese-bronze hover:text-white transition-all w-full md:w-auto transform hover:-translate-y-1"
                >
                  اطلب استشارة الآن
                </Link>
                <a 
                  href={`https://wa.me/${settings.contactPhone.replace(/\s+/g, '')}`} 
                  className="bg-lebanese-bronze/20 backdrop-blur-md border border-white/20 text-white px-14 py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-white hover:text-lebanese-green transition-all w-full md:w-auto flex items-center justify-center gap-4"
                >
                  <span>واتساب تواصل عبر</span>
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
