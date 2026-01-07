import { SiteSettings } from '../types.ts';

const API_URL = 'api/settings.php';

const DEFAULT_SETTINGS: SiteSettings = {
  heroTitle: 'ابحث عن منزل أحلامك بلمسة لبنانية عريقة',
  heroSubtitle: 'نقدم لك نخبة العقارات والفرص الاستثمارية في أرقى أحياء الضاحية وبيروت.',
  heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
  primaryColor: '#1B4332',
  accentColor: '#A67C52',
  fontFamily: "'Almarai', sans-serif",
  contactPhone: '+961 01 234 567',
  contactEmail: 'info@dahiehre.com'
};

export const cmsService = {
  getSettings: async (): Promise<SiteSettings> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) return DEFAULT_SETTINGS;
      const text = await response.text();
      if (!text) return DEFAULT_SETTINGS;
      return JSON.parse(text);
    } catch (error) {
      console.error("Settings fetch error:", error);
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings: async (settings: SiteSettings): Promise<boolean> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (response.ok) {
        cmsService.applySettings(settings);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  applySettings: (settings: SiteSettings) => {
    if (!settings) return;
    const root = document.documentElement;
    let styleTag = document.getElementById('dynamic-cms-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-cms-styles';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `
      :root {
        --primary-color: ${settings.primaryColor || '#1B4332'};
        --accent-color: ${settings.accentColor || '#A67C52'};
      }
      body { font-family: ${settings.fontFamily || "'Almarai', sans-serif"}; }
      .bg-lebanese-green { background-color: var(--primary-color) !important; }
      .text-lebanese-green { color: var(--primary-color) !important; }
      .bg-lebanese-bronze { background-color: var(--accent-color) !important; }
      .text-lebanese-bronze { color: var(--accent-color) !important; }
      .border-lebanese-bronze { border-color: var(--accent-color) !important; }
      .border-lebanese-bronze-hover:hover { border-color: var(--accent-color) !important; }
    `;
  }
};