
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
  name: string;
  email: string;
  phone: string;
  propertyId?: string;
  message: string;
}

export enum AppRoutes {
  HOME = '/',
  LISTINGS = '/listings',
  PROPERTY = '/property/:id',
  ABOUT = '/about',
  CONTACT = '/contact',
}
