// frontend/src/components/AutocompleteInput.tsx
// Lightweight auto-complete input that queries our backend /api/places
// When the user picks a suggestion, we geocode it via /api/geocode and return the lat/lng

import { useState, useEffect, ChangeEvent } from 'react';
import type { LatLng } from '../types';
import axios from 'axios';
import debounce from 'lodash.debounce';



interface Props {
  label: string;
  onSelect: (value: { description: string; location: LatLng }) => void;
}

const AutocompleteInput = ({ label, onSelect }: Props) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Debounced fetch suggestions
  const fetchSuggestions = debounce(async (input: string) => {
    if (!input) return setSuggestions([]);
    try {
      const { data } = await axios.get(`/api/places`, { params: { input } });
      setSuggestions(data || []);
    } catch (e) {
      console.error('Places error', e);
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(value);
    return fetchSuggestions.cancel;
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = async (pred: any) => {
    setValue(pred.description);
    setSuggestions([]);
    try {
      const { data } = await axios.get('/api/geocode', { params: { place_id: pred.place_id } });
      const loc = data.geometry.location;
      onSelect({ description: pred.description, location: { lat: loc.lat, lng: loc.lng } });
    } catch (e) {
      console.error('Geocode error', e);
    }
  };

  return (
    <div className="autocomplete-input">
      <input
        type="text"
        placeholder={label}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((p) => (
            <li key={p.place_id} onClick={() => handleSelect(p)}>
              {p.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
