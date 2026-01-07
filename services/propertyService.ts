
import { Property } from '../types';

const mockProperties: Property[] = [
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
  },
  {
    id: '2',
    title: 'فيلا فخمة بإطلالة جبلية',
    price: 450000,
    location: 'كفرشيما، المتن الجنوبي',
    category: 'sale',
    type: 'villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 320,
    description: 'فيلا مستقلة مع حديقة خاصة ومسبح. تصميم معماري يجمع بين الأصالة والحداثة.',
    images: ['https://picsum.photos/seed/villa1/800/600'],
    featured: true,
    amenities: ['مسبح', 'حديقة', 'تكييف مركزي', 'نظام أمني']
  },
  {
    id: '3',
    title: 'محل تجاري بموقع استراتيجي',
    price: 1200,
    location: 'الغبيري، الاوتوستراد العام',
    category: 'rent',
    type: 'commercial',
    area: 85,
    description: 'مساحة تجارية مثالية للمعارض أو المكاتب، واجهة زجاجية عريضة وحركة مرور عالية.',
    images: ['https://picsum.photos/seed/comm1/800/600'],
    featured: false,
    amenities: ['واجهة زجاجية', 'منطقة تخزين', 'مواقف عامة']
  },
  {
    id: '4',
    title: 'شقة سكنية بأسعار منافسة',
    price: 95000,
    location: 'الليلكي، قرب الجامعة',
    category: 'sale',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 110,
    description: 'شقة مناسبة للعائلات الصغيرة أو الاستثمار الطلابي. حالة جيدة جداً وجاهزة للسكن.',
    images: ['https://picsum.photos/seed/apt3/800/600'],
    featured: false,
    amenities: ['مصعد', 'موقف سيارة']
  }
];

export const propertyService = {
  getAll: (): Property[] => mockProperties,
  getFeatured: (): Property[] => mockProperties.filter(p => p.featured),
  getById: (id: string): Property | undefined => mockProperties.find(p => p.id === id),
  search: (query: string): Property[] => {
    const q = query.toLowerCase();
    return mockProperties.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.location.toLowerCase().includes(q)
    );
  }
};
