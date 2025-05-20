import '../styles/addDistance.css';
import { useAddDistanceStore } from '../store';
import { useState } from 'react';
import { calculateFuelCost, round2 } from '../lib/calculateFuelCost';

type input = {
  distance: string;
  consumption: string;
  price: string;
  split: string;
};
const AddDistance = () => {
  //declare store state

  const updateDistance = useAddDistanceStore((state) => state.updateDistance);
  const updateConsumption = useAddDistanceStore((state) => state.updateConsumption);
  const updatePrice = useAddDistanceStore((state) => state.updatePrice);
  const updateSplit = useAddDistanceStore((state) => state.updateSplit);
  const total = useAddDistanceStore((state) => state.total);
  const updateTotal = useAddDistanceStore((state) => state.updateTotal);
  const splitTotal = useAddDistanceStore((state) => state.splitTotal);
  const updateSplitTotal = useAddDistanceStore((state) => state.updateSplitTotal);

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
    updateDistance(round2(Number(input.distance)));
    updateConsumption(round2(Number(input.consumption)));
    updatePrice(round2(Number(input.price)));
    updateSplit(round2(Number(input.split)));

    const newTotal: number = calculateFuelCost(
      round2(Number(input.price)),
      round2(Number(input.consumption)),
      round2(Number(input.distance))
    );

    updateTotal(round2(newTotal));
    updateSplitTotal(round2(newTotal / Number(input.split)));
  };
  return (
    <div id="main-body-container">
      <h1>Fuel Share Calculator</h1>
      <div id="calculator-container">
        <form id="calculator-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="number"
              id="distance"
              name="distance"
              required
              placeholder=" "
              value={input.distance}
              onChange={handleChange}
              autoComplete="off"
            />
            <label htmlFor="distance">Distance (km)</label>
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
