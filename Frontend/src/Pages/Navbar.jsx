import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Home</Link>
      <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`}>    
        <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
      <li className="nav-item">
    <Link className="nav-link" to="/upload" onClick={toggleMenu}>Upload</Link>
      </li>
      <li className="nav-item">
    <Link className="nav-link" to="/users" onClick={toggleMenu}>Users</Link>
      </li>
     <li className="nav-item">
    <Link className="nav-link" to="/search" onClick={toggleMenu}>Dashboard</Link>
      </li>
     <li className="nav-item">
    <button className="btn btn-dark" onClick={logoutHandler}>Logout</button>
     </li>
</ul>
      </div>
    </nav>
  );
};

export default Navbar;


