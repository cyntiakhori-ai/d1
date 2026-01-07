
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyService } from '../services/propertyService.ts';
import { Property, AppRoutes } from '../types.ts';
import { Icons, SITE_INFO } from '../constants.tsx';
import LeadForm from '../components/LeadForm.tsx';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (id) {
      const data = propertyService.getById(id);
      if (data) setProperty(data);
    }
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lebanese-stone">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lebanese-green mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-lebanese-green">جاري تحميل البيانات...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-lebanese-stone min-h-screen pb-24">
      {/* Gallery Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto p-4 sm:p-8">
          <Link to={AppRoutes.LISTINGS} className="inline-flex items-center gap-2 text-lebanese-green font-bold mb-6 hover:text-lebanese-bronze transition-all">
            <span>→</span> العودة إلى القائمة
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px] lg:h-[600px]">
            <div className="lg:col-span-8 relative overflow-hidden rounded-2xl shadow-lg">
              <img 
                src={property.images[activeImg]} 
                className="w-full h-full object-cover"
                alt={property.title}
              />
            </div>
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 overflow-y-auto pr-2">
              {property.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`relative rounded-xl overflow-hidden h-32 lg:h-44 border-2 transition-all ${activeImg === idx ? 'border-lebanese-bronze shadow-lg scale-95' : 'border-transparent opacity-80'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="Property thumbnail" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Details Column */}
          <div className="lg:w-2/3">
            <div className="bg-white p-10 rounded-2xl shadow-sm mb-8 border border-lebanese-bronze/5">
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-lebanese-green text-white px-4 py-1 rounded-full text-sm font-bold">
                  {property.category === 'sale' ? 'للبيع' : 'للايجار'}
                </span>
                <span className="bg-lebanese-stone text-lebanese-green px-4 py-1 rounded-full text-sm font-bold border border-lebanese-green/20">
                  {property.type === 'apartment' ? 'شقة' : property.type === 'villa' ? 'فيلا' : 'تجاري'}
                </span>
              </div>
              
              <div className="flex justify-between items-start gap-4 mb-6">
                <div>
                  <h1 className="text-4xl font-extrabold text-lebanese-green mb-4 leading-tight">{property.title}</h1>
                  <div className="flex items-center gap-2 text-gray-500 font-bold">
                    <Icons.Location />
                    {property.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-lebanese-bronze">
                    ${property.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {property.category === 'rent' ? 'شهرياً' : 'سعر نهائي'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-100 mb-8">
                {property.bedrooms && (
                  <div className="text-center">
                    <div className="flex justify-center text-lebanese-green mb-2"><Icons.Bed /></div>
                    <div className="text-lg font-bold text-lebanese-green">{property.bedrooms}</div>
                    <div className="text-xs text-gray-400">غرف نوم</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center">
                    <div className="flex justify-center text-lebanese-green mb-2"><Icons.Bath /></div>
                    <div className="text-lg font-bold text-lebanese-green">{property.bathrooms}</div>
                    <div className="text-xs text-gray-400">حمامات</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="flex justify-center text-lebanese-green mb-2"><Icons.Area /></div>
                  <div className="text-lg font-bold text-lebanese-green">{property.area}</div>
                  <div className="text-xs text-gray-400">مساحة (م²)</div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-lebanese-green mb-4">وصف العقار</h3>
              <p className="text-gray-600 leading-loose text-lg mb-8 whitespace-pre-line">
                {property.description}
              </p>

              <h3 className="text-2xl font-bold text-lebanese-green mb-6">المميزات والخدمات</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="bg-lebanese-stone p-4 rounded-xl flex items-center gap-3 text-lebanese-green font-bold">
                    <span className="text-lebanese-bronze">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Card (Mobile Visible Only) */}
            <div className="lg:hidden mb-8">
               <LeadForm propertyId={property.id} />
            </div>
          </div>

          {/* Inquiry Column */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              <LeadForm propertyId={property.id} />
              
              <div className="bg-lebanese-green p-8 rounded-2xl text-white shadow-xl overflow-hidden relative group">
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-4">هل لديك أسئلة؟</h4>
                  <p className="text-white/70 mb-6 font-light">تواصل مباشرة مع الوكيل العقاري المسؤول عبر الواتساب للحصول على رد سريع.</p>
                  <a 
                    href={SITE_INFO.whatsapp} 
                    className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-extrabold transition-all shadow-lg"
                  >
                    واتساب مباشرة
                  </a>
                </div>
                <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 -ml-8 -mt-8 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
