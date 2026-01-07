
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, Lead, Property, SiteSettings } from '../types.ts';
import { propertyService } from '../services/propertyService.ts';
import { cmsService } from '../services/cmsService.ts';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'properties' | 'content' | 'leads' | 'settings'>('properties');
  const [properties, setProperties] = useState<Property[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '', price: 0, location: '', category: 'sale', type: 'apartment',
    bedrooms: 0, bathrooms: 0, area: 0, description: '', images: [],
    amenities: [], featured: false
  });
  const [imageUrl, setImageUrl] = useState('');
  const [amenityInput, setAmenityInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Leads
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate(AppRoutes.ADMIN_LOGIN);
      return;
    }
    refreshData();
  }, [navigate]);

  const refreshData = async () => {
    setLoading(true);
    const [props, sett, fetchLeads] = await Promise.all([
      propertyService.getAll(),
      cmsService.getSettings(),
      fetch('api/leads.php').then(res => res.json()).catch(() => [])
    ]);
    setProperties(props);
    setSettings(sett);
    setLeads(fetchLeads);
    cmsService.applySettings(sett);
    setLoading(false);
  };

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العقار من قاعدة البيانات؟')) {
      const success = await propertyService.delete(id);
      if (success) refreshData();
      else alert('فشل حذف العقار');
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
      title: '', price: 0, location: '', category: 'sale', type: 'apartment',
      bedrooms: 0, bathrooms: 0, area: 0, description: '', images: [],
      amenities: [], featured: false
    });
    setIsFormOpen(true);
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const newProp: Property = {
      ...(formData as Property),
      id: editingId || Date.now().toString(),
    };
    
    if (!newProp.images || newProp.images.length === 0) {
      alert('يرجى إضافة صورة واحدة على الأقل.');
      setIsSaving(false);
      return;
    }

    const success = await propertyService.save(newProp);
    if (success) {
      setIsFormOpen(false);
      refreshData();
      alert('تم حفظ العقار في قاعدة البيانات بنجاح');
    } else {
      alert('حدث خطأ أثناء الحفظ. تأكد من حجم الصور.');
    }
    setIsSaving(false);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
      };
      reader.onerror = reject;
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'property' | 'hero') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const compressed = await compressImage(files[i]);
        newImages.push(compressed);
      }
      if (target === 'property') {
        setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...newImages] }));
      } else if (settings) {
        setSettings({ ...settings, heroImage: newImages[0] });
      }
    } catch (err) { alert('خطأ في معالجة الصور'); }
    setIsUploading(false);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setIsSaving(true);
    const success = await cmsService.saveSettings(settings);
    if (success) alert('تم تحديث إعدادات الموقع بنجاح');
    else alert('فشل تحديث الإعدادات');
    setIsSaving(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate(AppRoutes.ADMIN_LOGIN);
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-lebanese-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-lebanese-green text-white p-8 flex flex-col shadow-2xl z-20 h-screen sticky top-0">
        <div className="mb-12">
          <h2 className="text-2xl font-black tracking-tighter">إدارة <span className="text-lebanese-bronze">الضاحية</span></h2>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">متصل بقاعدة البيانات</p>
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

      <main className="flex-1 p-6 md:p-12 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black text-lebanese-green">
            {activeTab === 'properties' ? (isFormOpen ? 'تعديل بيانات العقار' : 'قائمة العقارات') : activeTab === 'content' ? 'إدارة المحتوى' : activeTab === 'leads' ? 'طلبات العملاء الجدد' : 'الهوية البصرية'}
          </h1>
          {activeTab === 'properties' && !isFormOpen && (
            <button onClick={handleAddNew} className="bg-lebanese-bronze text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:shadow-2xl transition-all">
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
                  <th className="px-6 py-4 font-black text-gray-400 text-sm">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {properties.map(prop => (
                  <tr key={prop.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img src={prop.images[0]} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                      <span className="font-bold text-lebanese-green">{prop.title}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-lebanese-bronze">${prop.price.toLocaleString()}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => handleEditProperty(prop)} className="p-3 bg-gray-100 hover:bg-lebanese-green hover:text-white rounded-xl transition-all">✏️</button>
                      <button onClick={() => handleDeleteProperty(prop.id)} className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'properties' && isFormOpen && (
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-5xl mx-auto">
            <form onSubmit={handleSaveProperty} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" placeholder="عنوان العقار" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-gray-200" />
                <input type="number" placeholder="السعر $" required value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full px-5 py-4 rounded-2xl border border-gray-200" />
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                 <p className="text-xs font-black text-gray-400 mb-4 uppercase">صور العقار (قاعدة البيانات)</p>
                 <div className="relative">
                    <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, 'property')} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <div className="py-8 border-2 border-dashed border-gray-300 bg-white rounded-2xl text-center text-gray-400 font-bold">
                       {isUploading ? 'جاري ضغط ورفع الصور...' : 'انقر هنا لاختيار صور العقار'}
                    </div>
                 </div>
                 <div className="grid grid-cols-4 gap-4 mt-6">
                    {formData.images?.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                        <img src={img} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => {
                          const newImgs = [...formData.images!];
                          newImgs.splice(idx, 1);
                          setFormData({...formData, images: newImgs});
                        }} className="absolute top-1 left-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs">✕</button>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" disabled={isSaving} className="flex-1 bg-lebanese-green text-white py-5 rounded-2xl font-black text-lg shadow-xl disabled:opacity-50">
                  {isSaving ? 'جاري الحفظ...' : 'حفظ التعديلات في قاعدة البيانات'}
                </button>
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-12 py-5 bg-gray-100 text-gray-400 rounded-2xl font-black">إلغاء</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
            <form onSubmit={handleSaveSettings} className="space-y-10">
               <div>
                  <label className="block text-sm font-black text-gray-700 mb-3">عنوان الـ Hero</label>
                  <input type="text" value={settings.heroTitle} onChange={e => setSettings({...settings, heroTitle: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-gray-200" />
               </div>
               <button type="submit" disabled={isSaving} className="w-full bg-lebanese-green text-white py-5 rounded-2xl font-black text-lg">
                  تحديث محتوى الموقع
               </button>
            </form>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
            {leads.length > 0 ? leads.map(lead => (
              <div key={lead.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center group gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-black text-lebanese-green mb-2">{lead.name}</h3>
                  <p className="text-gray-500 mb-4 bg-gray-50 p-4 rounded-xl">"{lead.message}"</p>
                  <div className="flex gap-4 text-sm font-bold">
                    <span className="text-lebanese-bronze">📞 {lead.phone}</span>
                    <span className="text-gray-400">✉️ {lead.email}</span>
                  </div>
                </div>
                <a href={`https://wa.me/${lead.phone.replace(/\s+/g, '')}`} target="_blank" className="bg-green-500 text-white px-8 py-4 rounded-2xl font-black shadow-lg">واتساب</a>
              </div>
            )) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed text-gray-400">لا يوجد طلبات جديدة حالياً</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
