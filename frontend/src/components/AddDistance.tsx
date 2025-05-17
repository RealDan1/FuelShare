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
  // const distance = useSingleTripStore((state) => state.distance);
  const updateDistance = useAddDistanceStore((state) => state.updateDistance);
  // const consumption = useSingleTripStore((state) => state.consumption);
  const updateConsumption = useAddDistanceStore((state) => state.updateConsumption);
  // const price = useSingleTripStore((state) => state.price);
  const updatePrice = useAddDistanceStore((state) => state.updatePrice);
  // const split = useSingleTripStore((state) => state.split);
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
