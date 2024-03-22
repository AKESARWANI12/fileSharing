import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router v6

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Home</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/upload">Upload</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users">Users</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">Dashboard</Link>
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


