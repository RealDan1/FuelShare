import { Outlet, Link } from 'react-router';
import '../styles/mainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <nav>
        <Link to="/" className="heading">
          FuelShare
        </Link>

        <Link to="/" className="heading">
          Single Trip
        </Link>
      </nav>

      <Outlet />
      <footer className="footer">
        <hr /> All rights reserved
      </footer>
    </div>
  );
};
export default MainLayout;
