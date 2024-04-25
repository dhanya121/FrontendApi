import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './calculationlist.css'; // Import CSS file for styling
import LogoutButton from './Logout';

const CalculationList = () => {
  const [calculations, setCalculations] = useState([]);
  const [selectedCalculations, setSelectedCalculations] = useState([]);
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please Login');
    window.location.href = '/login';
  }

  useEffect(() => {
    const fetchCalculations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/account/calculations/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCalculations(response.data);
      } catch (error) {
        console.error('Error fetching calculations:', error);
      }
    };

    fetchCalculations();
  }, []);

  const handleCalculationSelect = (id) => {
    // Toggle selection state for the calculation with the given ID
    setSelectedCalculations(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(selId => selId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleDeleteCalculation = async (id) => {
    // Send the delete request to the backend
    try {
      await axios.delete(`http://localhost:8000/account/calculations/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Refresh calculations after deletion
      setCalculations(prevCalculations => prevCalculations.filter(calculation => calculation.id !== id));
    } catch (error) {
      console.error('Error deleting calculation:', error);
    }
  };

  const handleUpdateCalculation = (id) => {
    // Logic to handle update action for the calculation with the given ID
    console.log('Update calculation:', id);
    // Redirect to the update page or modal
  };

  return (
    <div className="calculation-list-container">
      <h2>Calculations</h2>
      <div className='logouts-div'>
        <LogoutButton />
      </div>
      <ul className="calculation-list">
        {calculations.map(calculation => (
          <li key={calculation.id}>
            <label>
              {/* <input
                type="checkbox"
                checked={selectedCalculations.includes(calculation.id)}
                onChange={() => handleCalculationSelect(calculation.id)}
              /> */}
              {calculation.operation}: {calculation.operand1} {calculation.operation} {calculation.operand2} = {calculation.result}
            </label>
            <button className='button-update' onClick={() => handleUpdateCalculation(calculation.id)}>Update</button>
            <button className='button-delete' onClick={() => handleDeleteCalculation(calculation.id)}>Delete</button>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalculationList;
