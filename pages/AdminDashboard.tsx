
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
  
  // Leads Storage (Simulated)
  const [leads] = useState<Lead[]>([
    { id: '1', name: 'أحمد جابر', email: 'ahmad@example.com', phone: '70123456', message: 'مهتم بشقة حارة حريك', date: '2024-05-20' }
  ]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) navigate(AppRoutes.ADMIN_LOGIN);
    setProperties(propertyService.getAll());
  }, [navigate]);

  const handleDeleteProperty = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      propertyService.delete(id);
      setProperties(propertyService.getAll());
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.saveSettings(settings);
    alert('تم حفظ الإعدادات بنجاح');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate(AppRoutes.ADMIN_LOGIN);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-lebanese-green text-white p-8 flex flex-col shadow-2xl z-10">
        <div className="mb-12">
          <h2 className="text-2xl font-black tracking-tighter">إدارة <span className="text-lebanese-bronze">الضاحية</span></h2>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">CMS Dashboard v1.0</p>
        </div>
        
        <nav className="space-y-2 flex-grow">
          {[
            { id: 'properties', label: 'إدارة العقارات', icon: '🏠' },
            { id: 'content', label: 'محتوى الصفحات', icon: '📝' },
            { id: 'leads', label: 'طلبات العملاء', icon: '📩' },
            { id: 'settings', label: 'إعدادات النظام', icon: '⚙️' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-right px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-4 ${activeTab === tab.id ? 'bg-white text-lebanese-green shadow-xl scale-105' : 'hover:bg-white/5 text-white/70'}`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 text-red-300 font-bold hover:text-red-100 transition-colors py-4 border-t border-white/10">
          <span>🚪</span> تسجيل الخروج
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black text-lebanese-green">
            {activeTab === 'properties' ? 'قائمة العقارات' : activeTab === 'content' ? 'تعديل المحتوى' : activeTab === 'leads' ? 'طلبات العملاء' : 'إعدادات الموقع'}
          </h1>
          {activeTab === 'properties' && (
            <button className="bg-lebanese-bronze text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
              + إضافة عقار جديد
            </button>
          )}
        </header>

        {activeTab === 'properties' && (
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
                  <tr key={prop.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img src={prop.images[0]} className="w-12 h-12 rounded-xl object-cover" />
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
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">✏️</button>
                        <button onClick={() => handleDeleteProperty(prop.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="max-w-4xl bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <form onSubmit={handleSaveSettings} className="space-y-8">
              <div>
                <label className="block text-sm font-black text-gray-700 mb-3">عنوان قسم الـ Hero</label>
                <input 
                  type="text" 
                  value={settings.heroTitle}
                  onChange={e => setSettings({...settings, heroTitle: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-lebanese-bronze transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-gray-700 mb-3">الوصف الجانبي (Hero Subtitle)</label>
                <textarea 
                  rows={4}
                  value={settings.heroSubtitle}
                  onChange={e => setSettings({...settings, heroSubtitle: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-lebanese-bronze transition-all"
                />
              </div>
              <button type="submit" className="bg-lebanese-green text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-lebanese-bronze transition-all">حفظ التغييرات</button>
            </form>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-4">اللون الأساسي (Primary Green)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="color" 
                      value={settings.primaryColor}
                      onChange={e => setSettings({...settings, primaryColor: e.target.value})}
                      className="w-20 h-20 rounded-2xl cursor-pointer border-0"
                    />
                    <span className="font-mono text-gray-400">{settings.primaryColor}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-4">اللون المميز (Bronze Accent)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="color" 
                      value={settings.accentColor}
                      onChange={e => setSettings({...settings, accentColor: e.target.value})}
                      className="w-20 h-20 rounded-2xl cursor-pointer border-0"
                    />
                    <span className="font-mono text-gray-400">{settings.accentColor}</span>
                  </div>
                </div>
             </div>
             <button 
                onClick={handleSaveSettings}
                className="mt-12 bg-lebanese-green text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-lebanese-bronze transition-all"
              >
                تطبيق الألوان الجديدة
              </button>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="grid grid-cols-1 gap-6">
            {leads.map(lead => (
              <div key={lead.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center group">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-lebanese-green">{lead.name}</h3>
                    <span className="text-xs font-bold text-gray-400">{lead.date}</span>
                  </div>
                  <p className="text-gray-500 mb-4">{lead.message}</p>
                  <div className="flex gap-4">
                    <span className="bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 border border-gray-100">📞 {lead.phone}</span>
                    <span className="bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 border border-gray-100">✉️ {lead.email}</span>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all">
                  <button className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-green-600">تواصل عبر واتساب</button>
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
