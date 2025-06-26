// frontend/src/components/MapWithRoutes.tsx
// Renders a Google Map with driving routes polylines. Allows selecting one.

import { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import axios from 'axios';
import { LatLng } from './AutocompleteInput';

interface Props {
  origin: LatLng | null;
  destination: LatLng | null;
  onRouteSelect: (distanceKm: number) => void;
}

const containerStyle = {
  width: '100%',
  height: '300px',
};

const MapWithRoutes = ({ origin, destination, onRouteSelect }: Props) => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const fetchRoutes = useCallback(async () => {
    if (!origin || !destination) return;
    setLoading(true);
    try {
      const originStr = `${origin.lat},${origin.lng}`;
      const destStr = `${destination.lat},${destination.lng}`;
      const { data } = await axios.get('/api/directions', {
        params: { origin: originStr, destination: destStr, alts: true },
      });
      setRoutes(data);
    } catch (e) {
      console.error('Directions error', e);
    } finally {
      setLoading(false);
    }
  }, [origin, destination]);

  // trigger once both coords available and routes empty
  if (origin && destination && routes.length === 0 && !loading) {
    fetchRoutes();
  }

  const handleSelect = async (idx: number) => {
    setSelectedIdx(idx);
    const sel = routes[idx];
    // Distance is in metres on first leg summary
    const metres = sel.legs?.[0]?.distance?.value;
    if (metres) {
      onRouteSelect(metres / 1000); // km
    }
  };

  if (!origin || !destination) return null;

  return (
    <div className="map-wrapper">
      {loading && <p>Loading routes…</p>}
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY || ''} libraries={['geometry']}>
        <GoogleMap center={origin} zoom={9} mapContainerStyle={containerStyle}>
          {routes.map((r, i) => (
            <Polyline
              key={i}
              path={window.google.maps.geometry.encoding.decodePath(r.overview_polyline.points)}
              options={{
                strokeColor: i === selectedIdx ? 'blue' : 'gray',
                strokeWeight: i === selectedIdx ? 6 : 3,
              }}
              onClick={() => handleSelect(i)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      {routes.length > 0 && (
        <div className="route-list">
          {routes.map((r, i) => (
            <button key={i} onClick={() => handleSelect(i)} className={selectedIdx === i ? 'active' : ''}>
              Route {i + 1} – {r.legs?.[0]?.distance?.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapWithRoutes;
