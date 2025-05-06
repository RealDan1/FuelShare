import SingleTrip from './components/SingleTrip';
import MainLayout from './components/MainLayout';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<SingleTrip />} />
          <Route element />
        </Route>
      </Routes>
    </>
  );
}

export default App;
