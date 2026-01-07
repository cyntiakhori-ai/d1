
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../types.ts';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // تجربة دخول بسيطة (للتوضيح فقط)
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('isAdmin', 'true');
      navigate(AppRoutes.ADMIN_DASHBOARD);
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-lebanese-stone flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-lebanese-bronze/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-lebanese-green">لوحة الإدارة</h1>
          <p className="text-gray-500 mt-2">سجل دخولك لإدارة عقارات الضاحية</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">اسم المستخدم</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-lebanese-bronze transition-all"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-lebanese-bronze transition-all"
              placeholder="••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-lebanese-green text-white py-4 rounded-xl font-extrabold hover:bg-lebanese-bronze transition-all shadow-lg"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
