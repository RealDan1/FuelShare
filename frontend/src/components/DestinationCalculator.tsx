// frontend/src/components/DestinationCalculator.tsx
// Modern implementation of the "Add Destination" / route selector screen

import '../styles/addDistance.css';
import { useState, useEffect } from 'react';
import AutocompleteInput from './AutocompleteInput';
import type { LatLng } from './AutocompleteInput';
import MapWithRoutes from './MapWithRoutes';
import { calculateFuelCost, round2 } from '../lib/calculateFuelCost';

const DestinationCalculator = () => {
  // Address selections
  const [origin, setOrigin] = useState<{ description: string; location: LatLng } | null>(null);
  const [destination, setDestination] = useState<{ description: string; location: LatLng } | null>(null);

  // Trip settings
  const [consumption, setConsumption] = useState(''); // L/100km
  const [price, setPrice] = useState(''); // price per litre
  const [split, setSplit] = useState(''); // number of ppl sharing

  // Computed results
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState('');
  const [splitTotalCost, setSplitTotalCost] = useState('');

  // Show/Hide map
  const [showRoutes, setShowRoutes] = useState(false);

  // Whenever distance or cost inputs change, recalc
  useEffect(() => {
    if (distanceKm !== null && consumption && price) {
      const tot = calculateFuelCost(round2(Number(price)), round2(Number(consumption)), distanceKm);
      setTotalCost(round2(tot).toString());
      if (split) {
        setSplitTotalCost(round2(tot / Number(split)).toString());
      }
    }
  }, [distanceKm, consumption, price, split]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin && destination) {
      setShowRoutes(true);
    }
  };

  return (
    <div id="main-body-container">
      <div className="desktop-description">
        <h1>Fuel Share Calculator</h1>
        <p className="description-long">
          Enter your origin & destination, pick a driving route and we’ll split the fuel cost for you.
        </p>
      </div>

      <div id="calculator-container">
        <form id="calculator-form" onSubmit={handleSubmit}>
          {/* Address autocomplete */}
          <AutocompleteInput label="Origin" onSelect={setOrigin} />
          <AutocompleteInput label="Destination" onSelect={setDestination} />

          {/* Numeric trip settings */}
          <div className="input-group">
            <input
              type="number"
              id="fuel-efficiency"
              required
              placeholder=" "
              value={consumption}
              onChange={(e) => setConsumption(e.target.value)}
            />
            <label htmlFor="fuel-efficiency">Fuel Efficiency (L/100km)</label>
          </div>

          <div className="input-group">
            <input
              type="number"
              id="fuel-price"
              required
              placeholder=" "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="fuel-price">Fuel Price (per L)</label>
          </div>

          <div className="input-group">
            <input
              type="number"
              id="split"
              required
              placeholder=" "
              value={split}
              onChange={(e) => setSplit(e.target.value)}
            />
            <label htmlFor="split">Number of People</label>
          </div>

          <button type="submit" id="show-routes" disabled={!origin || !destination}>
            Show Routes
          </button>
        </form>

        {/* MAP + ROUTES */}
        {showRoutes && origin && destination && (
          <MapWithRoutes
            origin={origin.location}
            destination={destination.location}
            onRouteSelect={(km) => setDistanceKm(km)}
          />
        )}

        {/* Totals */}
        <div id="totals">
          <h2>Totals</h2>
          <div className="total-field">
            <p>Distance</p>
            <p>{distanceKm ? `${distanceKm.toFixed(1)} km` : '—'}</p>
          </div>
          <div className="total-field">
            <p>Total Cost</p>
            <p>{totalCost ? `R${totalCost}` : '—'}</p>
          </div>
          <div className="total-field">
            <p>Cost per person</p>
            <p>{splitTotalCost ? `R${splitTotalCost}` : '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCalculator;
