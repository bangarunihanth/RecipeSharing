import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hacklogo1.png';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <li className="nav-item logo-container">
                <Link to="/" className="nav-link">
                    <img src={logo} style={{ width: "150px" }} alt="Logo" />
                </Link>
            </li>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Browse</Link>
                </li>
                <li className="nav-item">
                    <Link to="/form" className="nav-link">Add Recipe</Link>
                </li>
                <li className="nav-item">
                    <Link to="/community" className="nav-link">Community</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
