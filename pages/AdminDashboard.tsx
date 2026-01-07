
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, Lead, Property, SiteSettings } from '../types.ts';
import { propertyService } from '../services/propertyService.ts';
import { cmsService } from '../services/cmsService.ts';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'properties' | 'content' | 'leads' | 'settings'>('properties');
  const [properties, setProperties] = useState<Property[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(cmsService.getSettings());
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    price: 0,
    location: '',
    category: 'sale',
    type: 'apartment',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    description: '',
    images: [],
    amenities: [],
    featured: false
  });
  const [imageUrl, setImageUrl] = useState('');
  const [amenityInput, setAmenityInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Leads Storage (Simulated)
  const [leads] = useState<Lead[]>([
    { id: '1', name: 'أحمد جابر', email: 'ahmad@example.com', phone: '70123456', message: 'مهتم بشقة حارة حريك', date: '2024-05-20' }
  ]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) navigate(AppRoutes.ADMIN_LOGIN);
    setProperties(propertyService.getAll());
    cmsService.applySettings(settings);
  }, [navigate, settings]);

  const handleDeleteProperty = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      propertyService.delete(id);
      setProperties(propertyService.getAll());
    }
  };

  const handleEditProperty = (prop: Property) => {
    setEditingId(prop.id);
    setFormData(prop);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      price: 0,
      location: '',
      category: 'sale',
      type: 'apartment',
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      description: '',
      images: [],
      amenities: [],
      featured: false
    });
    setIsFormOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const newProp: Property = {
      ...(formData as Property),
      id: editingId || Date.now().toString(),
    };
    propertyService.save(newProp);
    setProperties(propertyService.getAll());
    setIsFormOpen(false);
    setEditingId(null);
  };

  const addImageUrl = () => {
    if (imageUrl) {
      setFormData({ ...formData, images: [...(formData.images || []), imageUrl] });
      setImageUrl('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'property' | 'hero') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newImages: string[] = [];

    const toBase64 = (file: File): Promise<string> => 
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });

    try {
      for (let i = 0; i < files.length; i++) {
        const base64 = await toBase64(files[i]);
        newImages.push(base64);
      }
      if (target === 'property') {
        setFormData(prev => ({ 
          ...prev, 
          images: [...(prev.images || []), ...newImages] 
        }));
      } else {
        setSettings(prev => ({ ...prev, heroImage: newImages[0] }));
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("حدث خطأ أثناء رفع الصور.");
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const images = [...(formData.images || [])];
    if (direction === 'up' && index > 0) {
      [images[index], images[index - 1]] = [images[index - 1], images[index]];
    } else if (direction === 'down' && index < images.length - 1) {
      [images[index], images[index + 1]] = [images[index + 1], images[index]];
    }
    setFormData({ ...formData, images });
  };

  const addAmenity = () => {
    if (amenityInput) {
      setFormData({ ...formData, amenities: [...(formData.amenities || []), amenityInput] });
      setAmenityInput('');
    }
  };

  const removeAmenity = (index: number) => {
    const newAmenities = [...(formData.amenities || [])];
    newAmenities.splice(index, 1);
    setFormData({ ...formData, amenities: newAmenities });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.saveSettings(settings);
    alert('تم حفظ إعدادات الموقع بنجاح');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate(AppRoutes.ADMIN_LOGIN);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-lebanese-green text-white p-8 flex flex-col shadow-2xl z-20 h-screen sticky top-0">
        <div className="mb-12">
          <h2 className="text-2xl font-black tracking-tighter">إدارة <span className="text-lebanese-bronze">الضاحية</span></h2>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">تحكم كامل بالمحتوى</p>
        </div>
        
        <nav className="space-y-2 flex-grow">
          {[
            { id: 'properties', label: 'إدارة العقارات', icon: '🏠' },
            { id: 'content', label: 'محتوى الواجهة', icon: '📝' },
            { id: 'leads', label: 'طلبات العملاء', icon: '📩' },
            { id: 'settings', label: 'تنسيق الموقع', icon: '⚙️' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setIsFormOpen(false); }}
              className={`w-full text-right px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-4 ${activeTab === tab.id ? 'bg-white text-lebanese-green shadow-xl scale-105' : 'hover:bg-white/5 text-white/70'}`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 text-red-300 font-bold hover:text-red-100 transition-colors py-4 border-t border-white/10">
          <span>🚪</span> تسجيل الخروج
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-lebanese-green mb-2">
              {activeTab === 'properties' ? (isFormOpen ? (editingId ? 'تعديل عقار' : 'إضافة عقار جديد') : 'قائمة العقارات') : activeTab === 'content' ? 'إدارة محتوى الموقع' : activeTab === 'leads' ? 'طلبات العملاء' : 'إعدادات الهوية البصرية'}
            </h1>
            <p className="text-gray-400 font-medium">نظام إدارة المحتوى المتكامل لعقارات الضاحية</p>
          </div>
          {activeTab === 'properties' && !isFormOpen && (
            <button 
              onClick={handleAddNew}
              className="bg-lebanese-bronze text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              + إضافة عقار جديد
            </button>
          )}
        </header>

        {activeTab === 'properties' && !isFormOpen && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-black text-gray-400 text-sm">العقار</th>
                  <th className="px-6 py-4 font-black text-gray-400 text-sm">السعر</th>
                  <th className="px-6 py-4 font-black text-gray-400 text-sm">المنطقة</th>
                  <th className="px-6 py-4 font-black text-gray-400 text-sm">الحالة</th>
                  <th className="px-6 py-4 font-black text-gray-400 text-sm">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {properties.map(prop => (
                  <tr key={prop.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img src={prop.images[0] || 'https://via.placeholder.com/150'} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                      <span className="font-bold text-lebanese-green">{prop.title}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-lebanese-bronze">${prop.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-500 font-medium">{prop.location}</td>
                    <td className="px-6 py-4">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${prop.category === 'sale' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                         {prop.category === 'sale' ? 'للبيع' : 'للايجار'}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEditProperty(prop)} className="p-3 bg-gray-100 hover:bg-lebanese-green hover:text-white rounded-xl transition-all">✏️</button>
                        <button onClick={() => handleDeleteProperty(prop.id)} className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'properties' && isFormOpen && (
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-5xl mx-auto mb-20">
            <form onSubmit={handleSaveProperty} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2">عنوان العقار</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-lebanese-bronze outline-none"
                    placeholder="مثال: شقة فاخرة في المعمورة"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2">السعر ($)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-lebanese-bronze outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2">المنطقة / الموقع</label>
                  <input 
                    type="text" 
                    required
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-lebanese-bronze outline-none"
                    placeholder="مثال: الغبيري، شارع العام"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">النوع</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value as any})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-lebanese-bronze outline-none"
                    >
                      <option value="apartment">شقة</option>
                      <option value="villa">فيلا</option>
                      <option value="commercial">تجاري</option>
                      <option value="land">أرض</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">التصنيف</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as any})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-lebanese-bronze outline-none"
                    >
                      <option value="sale">للبيع</option>
                      <option value="rent">للايجار</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">غرف النوم</label>
                    <input type="number" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: parseInt(e.target.value)})} className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">الحمامات</label>
                    <input type="number" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: parseInt(e.target.value)})} className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-2">المساحة م²</label>
                    <input type="number" value={formData.area} onChange={e => setFormData({...formData, area: parseInt(e.target.value)})} className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none" />
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                   <input 
                    type="checkbox" 
                    id="featured"
                    checked={formData.featured}
                    onChange={e => setFormData({...formData, featured: e.target.checked})}
                    className="w-6 h-6 accent-lebanese-bronze cursor-pointer"
                   />
                   <label htmlFor="featured" className="text-sm font-black text-gray-700 cursor-pointer">تمييز العقار (يظهر في الرئيسية)</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">وصف العقار التفصيلي</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-lebanese-bronze outline-none leading-relaxed"
                  placeholder="أدخل مواصفات العقار، المزايا، وحالة السند..."
                />
              </div>

              {/* Enhanced Image Management */}
              <div className="border-t border-gray-100 pt-10">
                <h3 className="text-xl font-black text-lebanese-green mb-6 flex items-center gap-3">
                  🖼️ إدارة معرض الصور
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <p className="text-xs font-black text-gray-400 mb-4 uppercase tracking-wider">إضافة عبر رابط URL</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="https://..."
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-lebanese-bronze text-sm"
                      />
                      <button type="button" onClick={addImageUrl} className="bg-lebanese-green text-white px-6 rounded-xl font-bold text-sm">إضافة</button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <p className="text-xs font-black text-gray-400 mb-4 uppercase tracking-wider">رفع من الجهاز</p>
                    <div className="relative">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'property')}
                        disabled={isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 bg-white text-gray-500 font-bold text-sm ${isUploading ? 'animate-pulse' : 'hover:border-lebanese-bronze'}`}>
                        {isUploading ? 'جاري الرفع...' : '📁 اختر صور العقار'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-50 p-8 rounded-[2rem]">
                  {formData.images && formData.images.length > 0 ? (
                    formData.images.map((img, idx) => (
                      <div key={idx} className={`relative group aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border-4 ${idx === 0 ? 'border-lebanese-bronze' : 'border-white'}`}>
                        <img src={img} className="w-full h-full object-cover" />
                        
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                          <button 
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="bg-red-500 text-white w-10 h-10 rounded-full shadow-lg font-bold"
                          >✕</button>
                          
                          <div className="flex gap-2">
                            <button 
                              type="button"
                              onClick={() => moveImage(idx, 'up')}
                              disabled={idx === 0}
                              className={`bg-white text-lebanese-green w-8 h-8 rounded-full flex items-center justify-center font-bold ${idx === 0 ? 'opacity-30' : 'hover:scale-110'}`}
                            >↑</button>
                            <button 
                              type="button"
                              onClick={() => moveImage(idx, 'down')}
                              disabled={idx === formData.images!.length - 1}
                              className={`bg-white text-lebanese-green w-8 h-8 rounded-full flex items-center justify-center font-bold ${idx === formData.images!.length - 1 ? 'opacity-30' : 'hover:scale-110'}`}
                            >↓</button>
                          </div>
                        </div>

                        {idx === 0 && (
                          <div className="absolute top-2 right-2 bg-lebanese-bronze text-white text-[10px] px-3 py-1 rounded-full font-black uppercase shadow-lg">الصورة الرئيسية</div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-16 text-center text-gray-400 font-bold border-2 border-dashed border-gray-200 rounded-3xl bg-white/50">
                      لا يوجد صور حالياً. يرجى إضافة صورة واحدة على الأقل.
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities */}
              <div className="border-t border-gray-100 pt-10">
                <label className="block text-sm font-black text-gray-700 mb-4 uppercase tracking-wider">الخدمات والمميزات</label>
                <div className="flex gap-4 mb-6">
                  <input 
                    type="text" 
                    placeholder="مثال: مصعد، موقف خاص، طاقة شمسية..."
                    value={amenityInput}
                    onChange={e => setAmenityInput(e.target.value)}
                    className="flex-1 px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-lebanese-bronze"
                  />
                  <button type="button" onClick={addAmenity} className="bg-lebanese-green text-white px-8 rounded-2xl font-black">إضافة</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {formData.amenities?.map((amen, idx) => (
                    <span key={idx} className="bg-white px-5 py-3 rounded-2xl text-sm font-black text-lebanese-green border border-gray-100 shadow-sm flex items-center gap-4 hover:border-red-100 group transition-all">
                      {amen}
                      <button type="button" onClick={() => removeAmenity(idx)} className="text-gray-300 group-hover:text-red-500 font-bold">✕</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-12 border-t border-gray-100">
                <button type="submit" className="flex-1 bg-lebanese-green text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-lebanese-bronze transition-all transform hover:-translate-y-1">حفظ العقار الآن</button>
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-12 py-5 rounded-2xl font-black text-gray-400 hover:bg-gray-100 transition-all">إلغاء</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="max-w-4xl bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 mx-auto">
            <form onSubmit={handleSaveSettings} className="space-y-10">
              <div className="grid grid-cols-1 gap-10">
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-4">صورة الـ Hero (الخلفية الرئيسية)</label>
                  <div className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <div className="w-full md:w-64 h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                      <img src={settings.heroImage} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 w-full space-y-4">
                      <input 
                        type="text"
                        value={settings.heroImage}
                        onChange={e => setSettings({...settings, heroImage: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs font-mono"
                        placeholder="https://..."
                      />
                      <div className="relative">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'hero')}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <button type="button" className="w-full py-3 bg-white border-2 border-dashed border-gray-300 rounded-xl text-sm font-bold text-gray-500 hover:border-lebanese-bronze transition-all">
                          رفع صورة جديدة من الجهاز
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-3">عنوان الصفحة الرئيسية</label>
                    <input 
                      type="text" 
                      value={settings.heroTitle}
                      onChange={e => setSettings({...settings, heroTitle: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-lebanese-bronze transition-all font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-3">الوصف الجانبي (Hero Subtitle)</label>
                    <textarea 
                      rows={4}
                      value={settings.heroSubtitle}
                      onChange={e => setSettings({...settings, heroSubtitle: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-lebanese-bronze transition-all leading-relaxed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-3">رقم الهاتف للواتساب</label>
                    <input 
                      type="text" 
                      value={settings.contactPhone}
                      onChange={e => setSettings({...settings, contactPhone: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-lebanese-bronze"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-gray-700 mb-3">البريد الإلكتروني للشركة</label>
                    <input 
                      type="email" 
                      value={settings.contactEmail}
                      onChange={e => setSettings({...settings, contactEmail: e.target.value})}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-lebanese-bronze"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-lebanese-green text-white px-10 py-5 rounded-2xl font-black shadow-xl hover:bg-lebanese-bronze transition-all transform hover:-translate-y-1 text-lg">
                تحديث محتوى الموقع
              </button>
            </form>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 mx-auto">
             <div className="space-y-12">
                <div>
                   <h3 className="text-xl font-black text-lebanese-green mb-8 flex items-center gap-3">🎨 الهوية البصرية والألوان</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <label className="block text-sm font-black text-gray-700 mb-4">اللون الأساسي (Primary Green)</label>
                        <div className="flex items-center gap-6">
                          <input 
                            type="color" 
                            value={settings.primaryColor}
                            onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                            className="w-24 h-24 rounded-2xl cursor-pointer border-4 border-white shadow-lg"
                          />
                          <input 
                            type="text" 
                            value={settings.primaryColor}
                            onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                            className="font-mono text-gray-400 bg-transparent border-b border-gray-200 outline-none"
                          />
                        </div>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <label className="block text-sm font-black text-gray-700 mb-4">اللون المميز (Bronze Accent)</label>
                        <div className="flex items-center gap-6">
                          <input 
                            type="color" 
                            value={settings.accentColor}
                            onChange={e => setSettings({...settings, accentColor: e.target.value})}
                            className="w-24 h-24 rounded-2xl cursor-pointer border-4 border-white shadow-lg"
                          />
                          <input 
                            type="text" 
                            value={settings.accentColor}
                            onChange={e => setSettings({...settings, accentColor: e.target.value})}
                            className="font-mono text-gray-400 bg-transparent border-b border-gray-200 outline-none"
                          />
                        </div>
                      </div>
                   </div>
                </div>

                <div>
                   <h3 className="text-xl font-black text-lebanese-green mb-8 flex items-center gap-3">🔤 الخطوط (Typography)</h3>
                   <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                      <label className="block text-sm font-black text-gray-700 mb-4">نوع الخط المستخدم (Font Family)</label>
                      <select 
                        value={settings.fontFamily}
                        onChange={e => setSettings({...settings, fontFamily: e.target.value})}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-lebanese-bronze font-bold"
                      >
                        <option value="'Almarai', sans-serif">Almarai (عصري)</option>
                        <option value="'Cairo', sans-serif">Cairo (كلاسيكي)</option>
                        <option value="'Tajawal', sans-serif">Tajawal (أنيق)</option>
                        <option value="system-ui, sans-serif">System Default</option>
                      </select>
                      <p className="mt-4 text-xs text-gray-400">سيتم تطبيق الخط فوراً على كافة نصوص الموقع.</p>
                   </div>
                </div>

                <button 
                  onClick={handleSaveSettings}
                  className="w-full bg-lebanese-green text-white px-10 py-5 rounded-2xl font-black shadow-xl hover:bg-lebanese-bronze transition-all transform hover:-translate-y-1 text-lg"
                >
                  تطبيق الإعدادات الجديدة
                </button>
             </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
            {leads.map(lead => (
              <div key={lead.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center group gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">👤</div>
                    <div>
                      <h3 className="text-xl font-black text-lebanese-green">{lead.name}</h3>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{lead.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 mb-6 leading-relaxed bg-gray-50/50 p-4 rounded-2xl border border-gray-50">"{lead.message}"</p>
                  <div className="flex flex-wrap gap-4">
                    <a href={`tel:${lead.phone}`} className="bg-white px-5 py-2.5 rounded-xl text-sm font-bold text-gray-700 border border-gray-200 shadow-sm hover:shadow-md transition-all">📞 {lead.phone}</a>
                    <a href={`mailto:${lead.email}`} className="bg-white px-5 py-2.5 rounded-xl text-sm font-bold text-gray-700 border border-gray-200 shadow-sm hover:shadow-md transition-all">✉️ {lead.email}</a>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <a 
                    href={`https://wa.me/${lead.phone.replace(/\s+/g, '')}`} 
                    target="_blank"
                    className="bg-green-500 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-green-600 text-center transition-all transform hover:scale-105"
                  >
                    واتساب العميل
                  </a>
                  <button className="bg-gray-100 text-gray-400 px-8 py-3 rounded-2xl font-bold text-sm">أرشفة الطلب</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
