import { useState } from 'react';
import { useToast } from '../providers/toast';

export function useFavorites() {
  const { show } = useToast();
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const isFavorite = prev.includes(id);
      const next = isFavorite ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(next));
      show(isFavorite ? 'Removed from favorites' : 'Added to favorites', 'success');
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
