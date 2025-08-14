import type { Place } from '../types/Place';
import { ApiClient } from './ApiClient';

export class PlaceService {
  private static readonly BASE_URL = '/api/places';

  static async getAllPlaces(): Promise<Place[]> {
    try {
      const response = await ApiClient.get<Place[]>(this.BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching places:', error);
      // Fallback to mock data for development
      return this.getMockPlaces();
    }
  }

  static async getPlaceById(id: number): Promise<Place | null> {
    try {
      const response = await ApiClient.get<Place>(`${this.BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching place:', error);
      // Fallback to mock data
      const mockPlaces = this.getMockPlaces();
      return mockPlaces.find(place => place.id === id) || null;
    }
  }

  static async searchPlaces(query: string): Promise<Place[]> {
    try {
      const response = await ApiClient.get<Place[]>(`${this.BASE_URL}/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching places:', error);
      return [];
    }
  }

  private static getMockPlaces(): Place[] {
    return [
      {
        id: 1,
        name: "Cascades d'Ourika",
        description: "Magnifiques cascades naturelles nichées dans les montagnes de l'Atlas. Un lieu parfait pour la randonnée et la détente au cœur de la nature.",
        category: "Nature",
        rating: 4.8,
        imageUrl: "https://example.com/cascade.jpg",
        latitude: 31.3073,
        longitude: -7.8721,
        address: "Vallée d'Ourika, Maroc",
        openingHours: "8h00 - 18h00",
        duration: "2-3 heures"
      },
      {
        id: 2,
        name: "Coopérative d'Argan",
        description: "Découvrez le processus traditionnel de production de l'huile d'argan par les femmes berbères locales.",
        category: "Culture",
        rating: 4.6,
        imageUrl: "https://example.com/argan.jpg",
        latitude: 31.2973,
        longitude: -7.8621,
        address: "Route d'Ourika, Maroc",
        openingHours: "9h00 - 17h00",
        duration: "1-2 heures"
      },
      {
        id: 3,
        name: "Marché de Tnine Ourika",
        description: "Marché traditionnel hebdomadaire avec épices, artisanat local et produits berbères authentiques.",
        category: "Shopping",
        rating: 4.4,
        imageUrl: "https://example.com/market.jpg",
        latitude: 31.2873,
        longitude: -7.8521,
        address: "Tnine Ourika, Maroc",
        openingHours: "Lundi 8h00 - 16h00",
        duration: "2-4 heures"
      }
    ];
  }
}
