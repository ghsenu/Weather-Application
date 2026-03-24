import { useState, useEffect, useCallback } from 'react';
import { SavedCity } from '@/types/weather';

export const useSavedCities = () => {
  const [savedCities, setSavedCities] = useState<SavedCity[]>([]);

  const loadCities = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const parsed = JSON.parse(localStorage.getItem('savedCities') || '[]');
        if (Array.isArray(parsed)) {
          const validCities = parsed.filter(c => c && typeof c.id === 'string' && typeof c.name === 'string');
          setSavedCities(validCities);
          if (validCities.length !== parsed.length) { 
            localStorage.setItem('savedCities', JSON.stringify(validCities));
          }
        }
      } catch (e) {
        setSavedCities([]);
        localStorage.removeItem('savedCities');
      }
    }
  }, []);

  useEffect(() => {
    loadCities();
    window.addEventListener('storage', loadCities);
    return () => window.removeEventListener('storage', loadCities);
  }, [loadCities]);

  const saveCity = (city: Omit<SavedCity, 'id' | 'addedAt'>) => {
    const id = `${city.name}-${city.country}`;
    const newCity: SavedCity = { ...city, id, addedAt: Date.now() };
    const newCities = [...savedCities, newCity];
    localStorage.setItem('savedCities', JSON.stringify(newCities));
    setSavedCities(newCities);
    return newCity;
  };

  const removeCity = (id: string) => {
    const newCities = savedCities.filter(c => c.id !== id);
    localStorage.setItem('savedCities', JSON.stringify(newCities));
    setSavedCities(newCities);
  };

  return { savedCities, saveCity, removeCity, loadCities };
};
