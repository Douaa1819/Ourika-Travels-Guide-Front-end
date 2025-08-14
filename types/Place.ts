export interface Place {
  id: number;
  name: string;
  description: string;
  category: string;
  rating: number;
  imageUrl: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  openingHours?: string;
  price?: number;
  duration?: string;
}

export interface PlaceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface PlaceFilter {
  category?: string;
  rating?: number;
  priceRange?: [number, number];
  distance?: number;
}
