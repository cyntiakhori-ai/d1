
import { SiteSettings } from '../types.ts';

const CMS_KEY = 'dahieh_settings';

const defaultSettings: SiteSettings = {
  heroTitle: 'ابحث عن منزل أحلامك بلمسة لبنانية عريقة',
  heroSubtitle: 'نقدم لك نخبة العقارات والفرص الاستثمارية في أرقى أحياء الضاحية وبيروت، مع ضمان الشفافية والاحترافية الكاملة.',
  heroImage: 'https://picsum.photos/seed/beirut/1920/1080',
  primaryColor: '#1B4332',
  accentColor: '#A67C52',
  fontFamily: "'Almarai', sans-serif",
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
    cmsService.applySettings(settings);
  },
  applySettings: (settings: SiteSettings) => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', settings.primaryColor);
    root.style.setProperty('--accent-color', settings.accentColor);
    root.style.fontFamily = settings.fontFamily;
    
    // Dynamically inject custom font if needed (basic implementation)
    let styleTag = document.getElementById('dynamic-cms-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-cms-styles';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `
      :root {
        --primary-color: ${settings.primaryColor};
        --accent-color: ${settings.accentColor};
      }
      body { font-family: ${settings.fontFamily}; }
      .bg-lebanese-green { background-color: var(--primary-color) !important; }
      .text-lebanese-green { color: var(--primary-color) !important; }
      .bg-lebanese-bronze { background-color: var(--accent-color) !important; }
      .text-lebanese-bronze { color: var(--accent-color) !important; }
      .border-lebanese-bronze { border-color: var(--accent-color) !important; }
    `;
  }
};
