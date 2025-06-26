import AddDistance from './components/AddDistance'; // Updated import
import MainLayout from './components/MainLayout';
import { Routes, Route } from 'react-router';
import DestinationCalculator from './components/DestinationCalculator';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AddDistance />} /> {/* Updated component */}
          <Route path="/add-destination" element={<DestinationCalculator />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
