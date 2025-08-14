import { PlaceService } from '@/services/PlaceService';
import type { Place } from '@/types/Place';
import { useEffect, useState } from 'react';

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPlaces();
  }, []);

  const loadPlaces = async () => {
    try {
      setLoading(true);
      const data = await PlaceService.getAllPlaces();
      setPlaces(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const refreshPlaces = () => {
    loadPlaces();
  };

  return {
    places,
    loading,
    error,
    refreshPlaces,
  };
}
