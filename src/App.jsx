import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FleetServiceData from './pages/FleetServiceData';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fleet-service" element={<FleetServiceData />} />
    </Routes>
  );
}

