import '../styles/singleTrip.css';

const SingleTrip = () => {
  return (
    <div id="main-body-container">
      <h1>Fuel Share Calculator</h1>
      <div id="calculator-container">
        <form id="fuel-calculator-form">
          <label htmlFor="distance">Distance (km):</label>
          <input type="number" id="distance" name="distance" required />

          <label htmlFor="fuel-efficiency">Fuel Efficiency (L/100km):</label>
          <input type="number" id="fuel-efficiency" name="fuel-efficiency" required />

          <label htmlFor="fuel-price">Fuel Price (per L):</label>
          <input type="number" id="fuel-price" name="fuel-price" required />

          <button type="submit">Calculate</button>
        </form>
      </div>
    </div>
  );
};
export default SingleTrip;
