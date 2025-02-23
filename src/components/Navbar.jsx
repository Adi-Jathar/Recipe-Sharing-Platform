import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure you import your CSS for styling

const Navbar = () => {
  const user = localStorage.getItem('user'); // Check if user is logged in

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-recipe">Add Recipe</Link>
        </li>
        <li>
          <Link to="/favourites">Favourites</Link>
        </li>
        {user ? (
          <li>
            <button onClick={() => localStorage.removeItem('user')}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
