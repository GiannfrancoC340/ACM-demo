import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Header() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="header">
      <div className="logo">Map App</div>
      {currentUser && (
        <nav>
          <Link to="/home">Home</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      )}
    </header>
  );
}

export default Header;