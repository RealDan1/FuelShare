// Centralised TypeScript type definitions for the backend (Node + Express)
// These definitions ensure that any TS or JSDoc-typed files in the backend
// reference a single source of truth for shared DTOs.

export interface LatLng {
  lat: number;
  lng: number;
}

export interface PlaceSuggestion {
  description: string;
  place_id: string;
}

export interface GeocodeResponse {
  geometry: {
    location: LatLng;
  };
}

export interface DirectionsRoute {
  overview_polyline: { points: string };
  legs: Array<{
    distance: { text: string; value: number };
  }>;
}
