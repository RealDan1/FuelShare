import { Outlet, Link } from 'react-router';
import '../styles/mainLayout.css';
import { useState } from 'react';

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('single-trip');

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
            className={`nav-item ${activeTab == 'single-trip' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('single-trip')}
          >
            Single Trip
          </Link>
          <Link
            to="/multiple-trips"
            className={`nav-item ${activeTab == 'multiple-trips' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('multiple-trips')}
          >
            Multiple Trips
          </Link>
        </div>

        {/* Settings */}
        <div className="settings">Settings</div>
        <div id="nav-logo">Logo</div>
      </nav>

      <Outlet />

      <footer className="footer">
        <p>All rights reserved</p>
      </footer>
    </div>
  );
};
export default MainLayout;
