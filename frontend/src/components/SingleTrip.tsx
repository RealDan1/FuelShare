import '../styles/singleTrip.css';

const SingleTrip = () => {
  return (
    <div id="main-body-container">
      <h1>Fuel Share Calculator</h1>
      <div id="calculator-container">
        <form id="calculator-form">
          <input type="number" id="distance" name="distance" required placeholder="Distance (km):" />

          <input
            type="number"
            id="fuel-efficiency"
            name="fuel-efficiency"
            required
            placeholder="Fuel Efficiency (L/100km)"
          />

          <input type="number" id="fuel-price" name="fuel-price" required placeholder="Fuel Price (L)" />

          <input type="number" id="people" name="people" required placeholder="Number of People:" />

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
