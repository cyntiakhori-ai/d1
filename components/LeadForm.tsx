
import React, { useState } from 'react';

interface LeadFormProps {
  propertyId?: string;
  title?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ propertyId, title = "تواصل معنا للمزيد من المعلومات" }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to a backend
  };

  if (submitted) {
    return (
      <div className="bg-lebanese-green text-white p-8 rounded-xl text-center shadow-lg">
        <div className="mb-4 inline-block bg-white/20 p-4 rounded-full">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">شكراً لثقتكم!</h3>
        <p className="text-white/80">تم استلام طلبكم بنجاح، وسيقوم أحد مستشارينا بالتواصل معكم خلال 24 ساعة.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl border border-lebanese-bronze/10">
      <h3 className="text-2xl font-bold text-lebanese-green mb-6">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded border border-gray-200 focus:border-lebanese-bronze focus:ring-1 focus:ring-lebanese-bronze outline-none transition-all"
            placeholder="ادخل اسمك هنا"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف</label>
          <input
            type="tel"
            required
            className="w-full px-4 py-3 rounded border border-gray-200 focus:border-lebanese-bronze focus:ring-1 focus:ring-lebanese-bronze outline-none transition-all"
            placeholder="+961 XX XXX XXX"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني (اختياري)</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded border border-gray-200 focus:border-lebanese-bronze focus:ring-1 focus:ring-lebanese-bronze outline-none transition-all"
            placeholder="example@mail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">رسالتك</label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded border border-gray-200 focus:border-lebanese-bronze focus:ring-1 focus:ring-lebanese-bronze outline-none transition-all"
            placeholder="بماذا يمكننا مساعدتك؟"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-lebanese-green text-white py-4 rounded font-extrabold hover:bg-lebanese-bronze transition-all shadow-md"
        >
          ارسال الطلب
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
