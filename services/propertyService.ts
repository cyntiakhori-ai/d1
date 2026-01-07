
import { Property } from '../types.ts';

const STORAGE_KEY = 'dahieh_properties';

const defaultProperties: Property[] = [
  {
    id: '1',
    title: 'شقة فاخرة في قلب حارة حريك',
    price: 185000,
    location: 'حارة حريك، بيروت',
    category: 'sale',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 165,
    description: 'شقة عصرية بتشطيبات سوبر ديلوكس، تقع في منطقة هادئة وراقية. تتميز بإطلالة مفتوحة وتوزيع ذكي للغرف.',
    images: ['https://picsum.photos/seed/apt1/800/600', 'https://picsum.photos/seed/apt2/800/600'],
    featured: true,
    amenities: ['موقف سيارة', 'مصعد', 'بئر مياه', 'كهرباء 24/7']
  }
];

const getStored = (): Property[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : defaultProperties;
};

export const propertyService = {
  getAll: (): Property[] => getStored(),
  getFeatured: (): Property[] => getStored().filter(p => p.featured),
  getById: (id: string): Property | undefined => getStored().find(p => p.id === id),
  save: (property: Property) => {
    const props = getStored();
    const index = props.findIndex(p => p.id === property.id);
    if (index > -1) {
      props[index] = property;
    } else {
      props.push(property);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(props));
  },
  delete: (id: string) => {
    const props = getStored().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(props));
  }
};
