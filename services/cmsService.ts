
import { SiteSettings } from '../types.ts';

const CMS_KEY = 'dahieh_settings';

const defaultSettings: SiteSettings = {
  heroTitle: 'ابحث عن منزل أحلامك بلمسة لبنانية عريقة',
  heroSubtitle: 'نقدم لك نخبة العقارات والفرص الاستثمارية في أرقى أحياء الضاحية وبيروت، مع ضمان الشفافية والاحترافية الكاملة.',
  primaryColor: '#1B4332',
  accentColor: '#A67C52',
  contactPhone: '+961 01 234 567',
  contactEmail: 'info@dahiehre.com'
};

export const cmsService = {
  getSettings: (): SiteSettings => {
    const data = localStorage.getItem(CMS_KEY);
    return data ? JSON.parse(data) : defaultSettings;
  },
  saveSettings: (settings: SiteSettings) => {
    localStorage.setItem(CMS_KEY, JSON.stringify(settings));
    // تحديث المتغيرات في الـ CSS فوراً
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
  }
};
