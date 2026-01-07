
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  category: 'sale' | 'rent';
  type: 'apartment' | 'villa' | 'land' | 'commercial';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  description: string;
  images: string[];
  featured: boolean;
  amenities: string[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId?: string;
  message: string;
  date: string;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  accentColor: string;
  contactPhone: string;
  contactEmail: string;
}

export enum AppRoutes {
  HOME = '/',
  LISTINGS = '/listings',
  PROPERTY = '/property/:id',
  ABOUT = '/about',
  CONTACT = '/contact',
  ADMIN_LOGIN = '/admin/login',
  ADMIN_DASHBOARD = '/admin/dashboard'
}
