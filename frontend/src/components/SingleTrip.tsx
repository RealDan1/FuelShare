import '../styles/singleTrip.css';
import { useSingleTripStore } from '../store';
import { useState } from 'react';
type input = {
  distance: string;
  litresPerHundred: string;
  fuelCost: string;
  peopleToSplit: string;
};
const SingleTrip = () => {
  //declare store state
  const distance = useSingleTripStore((state) => state.distance);
  const updateDistance = useSingleTripStore((state) => state.updateDistance);
  const litresPerHundred = useSingleTripStore((state) => state.litresPerHundred);
  const updateLitresPerHundred = useSingleTripStore((state) => state.updateLitresPerHundred);
  const fuelCost = useSingleTripStore((state) => state.fuelCost);
  const updateFuelCost = useSingleTripStore((state) => state.updateFuelCost);
  const peopleToSplit = useSingleTripStore((state) => state.peopleToSplit);
  const updatePeopleToSplit = useSingleTripStore((state) => state.updatePeopleToSplit);
  //declare input state
  const [input, setInput] = useState<input>({
    distance: '',
    litresPerHundred: '',
    //change to consumption, price, SPLIT PEOPLE INTO LATER CALC. do trip calc separate
    fuelCost: '',
    peopleToSplit: '',
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
    } else if (name == 'litresPerHundred') {
      setInput((prevInput) => {
        return {
          ...prevInput,
          litresPerHundred: value,
        };
      });
    } else if (name == 'fuelCost') {
      setInput((prevInput) => {
        return {
          ...prevInput,
          fuelCost: value,
        };
      });
    } else if (name == 'peopleToSplit') {
      setInput((prevInput) => {
        return {
          ...prevInput,
          peopleToSplit: value,
        };
      });
    }
  };

  // form on submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateDistance(Number(input.distance));
    updateLitresPerHundred(Number(input.litresPerHundred));
    updateFuelCost(Number(input.fuelCost));
    updatePeopleToSplit(Number(input.peopleToSplit));
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
          {distance}
          <input
            type="number"
            id="fuel-efficiency"
            name="litresPerHundred"
            required
            placeholder="Fuel Efficiency (L/100km)"
            value={input.litresPerHundred}
            onChange={handleChange}
          />
          {litresPerHundred}
          <input
            type="number"
            id="fuel-price"
            name="fuelCost"
            placeholder="Fuel Price (L)"
            value={input.fuelCost}
            onChange={handleChange}
          />
          {fuelCost}
          <input
            type="number"
            id="peopleToSplit"
            name="peopleToSplit"
            required
            placeholder="Number of People:"
            value={input.peopleToSplit}
            onChange={handleChange}
          />
          {peopleToSplit}
          <button type="submit" id="calculate-button">
            Calculate
          </button>
        </form>

        <div id="totals">
          <h2>Totals</h2>
          <div className="total-field">
            <p>Total Cost</p>
            <p>—</p>
          </div>
          <div className="total-field">
            <p>Cost per person</p>
            <p>—</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleTrip;
