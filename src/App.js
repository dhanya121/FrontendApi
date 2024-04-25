// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Login from './Login';
// import Register from './Register';
import CalculatorPage from './Calculator';
import CalculationList from './CalculationList';
import LogoutButton from './Logout';


const App = () => {
    return (
        <Router>
            <div>
                <Navigation />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/register" element={<Register />} /> */}
                    <Route path="/calculator" element={<CalculatorPage />} />
                    <Route path="/calculatorlist" element={<CalculationList />} />

                </Routes>
            </div>
        </Router>
    );
};

export default App;
