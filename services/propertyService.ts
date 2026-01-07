import { Property } from '../types.ts';

const API_URL = 'api/properties.php';

export const propertyService = {
  getAll: async (): Promise<Property[]> => {
    try {
      const response = await fetch(API_URL);
      const text = await response.text();
      if (!text) return []; // تجنب خطأ JSON الفارغ
      return JSON.parse(text);
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
  },

  getFeatured: async (): Promise<Property[]> => {
    const all = await propertyService.getAll();
    return all.filter(p => p.featured);
  },

  getById: async (id: string): Promise<Property | undefined> => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`);
      if (!response.ok) return undefined;
      const text = await response.text();
      if (!text) return undefined;
      return JSON.parse(text);
    } catch (error) {
      return undefined;
    }
  },

  save: async (property: Property): Promise<boolean> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property)
      });
      return response.ok;
    } catch (error) {
      console.error("Save error:", error);
      return false;
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};