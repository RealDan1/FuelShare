import { Outlet, Link } from 'react-router';
import '../styles/mainLayout.css';
import { useState } from 'react';

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('add-distance'); // Changed from 'single-trip'

  //! insert logo png
  // ! Change to input Distance and input Destination
  return (
    <div className="main-layout">
      <nav className="navigation">
        <Link to="/" id="nav-heading">
          FuelShare
        </Link>

        {/* Hamburger only visible on mobile */}
        <button className="hamburger-button" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Nav links container - changes style based on screen size */}
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <Link
            to="/"
            className={`nav-item ${activeTab == 'add-distance' ? 'active-tab' : ''}`}
            onClick={() => { setActiveTab('add-distance'); setMenuOpen(false); }}
          >
            Add Distance
          </Link>

          <Link
            to="/add-destination"
            className={`nav-item ${activeTab == 'add-destination' ? 'active-tab' : ''}`}
            onClick={() => { setActiveTab('add-destination'); setMenuOpen(false); }}
          >
            Add Destination
          </Link>
        </div>

        <div className="settings">Settings</div>
        <div id="nav-logo">Logo</div>
        {/* !insert logo */}
      </nav>

      <Outlet />

      <footer className="footer">
        <p>All rights reserved</p>
      </footer>
    </div>
  );
};
export default MainLayout;
