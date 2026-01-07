
import React, { useState, useEffect } from 'react';
import { propertyService } from '../services/propertyService.ts';
import PropertyCard from '../components/PropertyCard.tsx';
import { Property } from '../types.ts';

const Listings: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let results = propertyService.getAll();
    
    if (filterType !== 'all') {
      results = results.filter(p => p.type === filterType);
    }
    
    if (filterCategory !== 'all') {
      results = results.filter(p => p.category === filterCategory);
    }

    if (searchTerm) {
      results = results.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setProperties(results);
  }, [filterType, filterCategory, searchTerm]);

  return (
    <div className="bg-lebanese-stone min-h-screen pb-24">
      {/* Header */}
      <div className="bg-lebanese-green text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold mb-4">استكشف عقاراتنا</h1>
          <p className="text-white/70 text-lg">أفضل العروض السكنية والتجارية في لبنان بين يديك.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <aside className="lg:w-1/4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-lebanese-bronze/10 sticky top-28">
              <h3 className="text-xl font-bold text-lebanese-green mb-6 border-b border-gray-100 pb-4">فلترة البحث</h3>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">بحث عام</label>
                  <input 
                    type="text" 
                    placeholder="ابحث عن منطقة أو عنوان..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 rounded border border-gray-200 outline-none focus:border-lebanese-bronze text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">نوع العقار</label>
                  <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-3 rounded border border-gray-200 outline-none focus:border-lebanese-bronze text-sm font-medium"
                  >
                    <option value="all">الكل</option>
                    <option value="apartment">شقة سكنية</option>
                    <option value="villa">فيلا / منزل مستقل</option>
                    <option value="commercial">محل تجاري / مكتب</option>
                    <option value="land">أرض</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">غرض العقد</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="cat" 
                        checked={filterCategory === 'all'}
                        onChange={() => setFilterCategory('all')}
                        className="w-4 h-4 text-lebanese-bronze focus:ring-lebanese-bronze"
                      />
                      <span className="text-gray-600 group-hover:text-lebanese-green transition-all">الكل</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="cat" 
                        checked={filterCategory === 'sale'}
                        onChange={() => setFilterCategory('sale')}
                        className="w-4 h-4 text-lebanese-bronze focus:ring-lebanese-bronze"
                      />
                      <span className="text-gray-600 group-hover:text-lebanese-green transition-all">للبيع</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="cat" 
                        checked={filterCategory === 'rent'}
                        onChange={() => setFilterCategory('rent')}
                        className="w-4 h-4 text-lebanese-bronze focus:ring-lebanese-bronze"
                      />
                      <span className="text-gray-600 group-hover:text-lebanese-green transition-all">للايجار</span>
                    </label>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setFilterType('all');
                    setFilterCategory('all');
                    setSearchTerm('');
                  }}
                  className="w-full py-3 text-lebanese-bronze font-bold hover:underline"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            </div>
          </aside>

          {/* Listings Grid */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-lebanese-green">
                النتائج المتاحة ({properties.length})
              </h2>
            </div>
            
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {properties.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-20 rounded-2xl text-center border border-dashed border-gray-300">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-500 mb-2">عذراً، لم نجد نتائج مطابقة</h3>
                <p className="text-gray-400">حاول تغيير معايير البحث أو تواصل معنا لمساعدتك.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Listings;
