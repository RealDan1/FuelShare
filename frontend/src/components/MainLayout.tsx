import { Outlet, Link } from 'react-router';
import '../styles/mainLayout.css';
import { useState } from 'react';

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <div className="main-layout">
      <nav className="navigation">
        <Link to="/" className="logo">
          FuelShare
        </Link>

        {/* Hamburger only visible on mobile */}
        <button className="hamburger-button" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Nav links container - changes style based on screen size */}
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <Link to="/">Single Trip</Link>
        </div>

        {/* Settings */}
        <div className="settings">Settings</div>
        <div className="">Logo</div>
      </nav>

      <Outlet />

      <footer className="footer">
        <hr /> All rights reserved
      </footer>
    </div>
  );
};
export default MainLayout;
