import '../styles/singleTrip.css';
import { useSingleTripStore } from '../store';
import { useState } from 'react';
import { calculateFuelCost } from '../lib/calculateFuelCost';

type input = {
  distance: string;
  consumption: string;
  price: string;
  split: string;
};
const SingleTrip = () => {
  //declare store state
  // const distance = useSingleTripStore((state) => state.distance);
  const updateDistance = useSingleTripStore((state) => state.updateDistance);
  // const consumption = useSingleTripStore((state) => state.consumption);
  const updateConsumption = useSingleTripStore((state) => state.updateConsumption);
  // const price = useSingleTripStore((state) => state.price);
  const updatePrice = useSingleTripStore((state) => state.updatePrice);
  // const split = useSingleTripStore((state) => state.split);
  const updateSplit = useSingleTripStore((state) => state.updateSplit);
  const total = useSingleTripStore((state) => state.total);
  const updateTotal = useSingleTripStore((state) => state.updateTotal);
  const splitTotal = useSingleTripStore((state) => state.splitTotal);
  const updateSplitTotal = useSingleTripStore((state) => state.updateSplitTotal);

  //declare input state
  const [input, setInput] = useState<input>({
    distance: '',
    consumption: '',
    //change to consumption, price, SPLIT PEOPLE INTO LATER CALC. do trip calc separate
    price: '',
    split: '',
  });

  //form on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == 'distance') {
      setInput((prevInput) => {
        return {
          ...prevInput,
          distance: value,
        };
      });
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
    updateDistance(Number(input.distance));
    updateConsumption(Number(input.consumption));
    updatePrice(Number(input.price));
    updateSplit(Number(input.split));

    const newTotal: number = calculateFuelCost(Number(input.price), Number(input.consumption), Number(input.distance));
    updateTotal(newTotal);
    updateSplitTotal(newTotal / Number(input.split));
  };
  return (
    <div id="main-body-container">
      <h1>Fuel Share Calculator</h1>
      <div id="calculator-container">
        <form id="calculator-form" onSubmit={handleSubmit}>
          <input
            type="number"
            id="distance"
            name="distance"
            required
            placeholder="Distance (km):"
            value={input.distance}
            onChange={handleChange}
          />

          <input
            type="number"
            id="fuel-efficiency"
            name="consumption"
            required
            placeholder="Fuel Efficiency (L/100km)"
            value={input.consumption}
            onChange={handleChange}
          />

          <input
            type="number"
            id="fuel-price"
            name="price"
            placeholder="Fuel Price (L)"
            value={input.price}
            onChange={handleChange}
          />

          <input
            type="number"
            id="split"
            name="split"
            required
            placeholder="Number of People:"
            value={input.split}
            onChange={handleChange}
          />

          <button type="submit" id="calculate-button">
            Calculate
          </button>
        </form>

        <div id="totals">
          <h2>Totals</h2>
          <div className="total-field">
            <p>Total Cost</p>
            <p>{total}</p>
          </div>
          <div className="total-field">
            <p>Cost per person</p>
            <p>{splitTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleTrip;
