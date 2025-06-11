import '../styles/addDistance.css';
// import { useAddDistanceStore } from '../store';
import { useState } from 'react';
import { calculateFuelCost, round2 } from '../lib/calculateFuelCost';

type input = {
  origin: string;
  destination: string;
  // distance will be calculated via API and not input by user
  // distance: string;
  consumption: string;
  price: string;
  split: string;
};
const AddDistance = () => {
  // local state for totals
  const [distance, setDistance] = useState<string>('');
  const [total, setTotal] = useState<string>('');
  const [splitTotal, setSplitTotal] = useState<string>('');

  //declare input state
  const [input, setInput] = useState<input>({
    origin: '',
    destination: '',
    // distance: '',
    consumption: '',
    price: '',
    split: '',
  });

  //form on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == 'origin') {
      setInput((prevInput) => ({ ...prevInput, origin: value }));
    } else if (name == 'destination') {
      setInput((prevInput) => ({ ...prevInput, destination: value }));

    } else if (name == 'consumption') {
      setInput((prevInput) => {
        return {
          ...prevInput,
          consumption: value,
        };
      });
    } else if (name == 'price') {
      setInput((prevInput) => {
        return {
          ...prevInput,
          price: value,
        };
      });
    } else if (name == 'split') {
      setInput((prevInput) => {
        return {
          ...prevInput,
          split: value,
        };
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Use a placeholder value for distance until API integration
    setDistance('To be calculated');
    const placeholderDistance = 0;
    const newTotal: number = calculateFuelCost(
      round2(Number(input.price)),
      round2(Number(input.consumption)),
      placeholderDistance
    );
    setTotal(newTotal ? round2(newTotal).toString() : '');
    setSplitTotal(newTotal && Number(input.split) ? round2(newTotal / Number(input.split)).toString() : '');
  };
  return (
    <div id="main-body-container">
      <div className="desktop-description">
        <h1>Fuel Share Calculator</h1>
        <p className="description-long">
          Welcome to FuelShare! Effortlessly split your trip's fuel costs with friends. Enter your trip distance, your
          car's fuel efficiency, the current fuel price, and how many people are sharing. We'll instantly calculate the
          total cost and each person's share!
        </p>
      </div>
      <div className="mobile-description">
        <h2>FuelShare</h2>
        <p className="description-short">Split your trip's fuel costs in seconds. Enter details below!</p>
      </div>
      <div id="calculator-container">
        <form id="calculator-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="origin"
              name="origin"
              required
              placeholder=" "
              value={input.origin}
              onChange={handleChange}
              autoComplete="off"
            />
            <label htmlFor="origin">Origin</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              id="destination"
              name="destination"
              required
              placeholder=" "
              value={input.destination}
              onChange={handleChange}
              autoComplete="off"
            />
            <label htmlFor="destination">Destination</label>
          </div>

          <div className="input-group">
            <input
              type="number"
              id="fuel-efficiency"
              name="consumption"
              required
              placeholder=" "
              value={input.consumption}
              onChange={handleChange}
              autoComplete="off"
            />
            <label htmlFor="fuel-efficiency">Fuel Efficiency (L/100km)</label>
          </div>

          <div className="input-group">
            <input
              type="number"
              id="fuel-price"
              name="price"
              placeholder=" "
              value={input.price}
              onChange={handleChange}
              autoComplete="off"
            />
            <label htmlFor="fuel-price">Fuel Price (L)</label>
          </div>

          <div className="input-group">
            <input
              type="number"
              id="split"
              name="split"
              required
              placeholder=" "
              value={input.split}
              onChange={handleChange}
              autoComplete="off"
            />
            <label htmlFor="split">Number of People</label>
          </div>

          <button type="submit" id="calculate-button">
            Calculate
          </button>
        </form>

        <div id="totals">
          <h2>Totals</h2>
          <div className="total-field">
            <p>Distance</p>
            <p>{distance ? distance : '—'}</p>
          </div>
          <div className="total-field">
            <p>Total Cost</p>
            <p>{total ? `R` + total : '—'}</p>
          </div>
          <div className="total-field">
            <p>Cost per person</p>
            <p>{splitTotal ? `R` + splitTotal : '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddDistance;
