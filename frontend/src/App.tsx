import SingleTrip from './components/SingleTrip';
import MainLayout from './components/MainLayout';
import { Routes, Route } from 'react-router';
import MultipleTrips from './components/MultipleTrips';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<SingleTrip />} />
          <Route path="/multiple-trips" element={<MultipleTrips />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
