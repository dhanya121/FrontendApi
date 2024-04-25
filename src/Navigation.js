// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <Link to="/login"></Link>
                {/* <li><Link to="/register">Register</Link></li> */}
                <Link to="/calculator"></Link>
                {/* <Link to="/logout">Logout</Link> */}

            </ul>
        </nav>
    );
};

export default Navigation;
