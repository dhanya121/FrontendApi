import React, { useState } from 'react';
import axios from 'axios';
import './calculator.css'; // Import CSS file
import { Link } from 'react-router-dom';
import LogoutButton from './Logout';


const CalculatorForm = () => {
  const [operation, setOperation] = useState('');
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please Login');
    window.location.href = '/login';

  }

  const handleSubmit = async (event) => {
    event.preventDefault();



    try {
      const response = await axios.post('http://localhost:8000/account/calculations/', {
        operation,
        operand1: parseFloat(operand1),
        operand2: parseFloat(operand2),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setResult(response.data.result);
      setError(null);
    } catch (error) {
      setResult(null);
      setError('An error occurred while calculating. Please try again.');
    }
  };

  return (
    <div className="calculator-container"> {/* Apply styles to the container */}
      <h2>Calculator</h2>
      <div className='calculator-list-div'>
      <Link to="/calculatorlist">Calculator List</Link>
      </div>
      <form onSubmit={handleSubmit} className="calculator-form"> {/* Apply styles to the form */}
        <label>
          Operation:
          <select value={operation} onChange={(e) => setOperation(e.target.value)} required>
            <option value="">Select an operation</option>
            <option value="add">Addition</option>
            <option value="subtract">Subtraction</option>
            <option value="multiply">Multiplication</option>
            <option value="divide">Division</option>
          </select>
        </label>
        <br />
        <label>
          Operand 1:
          <input type="number" value={operand1} onChange={(e) => setOperand1(e.target.value)} required />
        </label>
        <br />
        <label>
          Operand 2:
          <input type="number" value={operand2} onChange={(e) => setOperand2(e.target.value)} required />
        </label>
        <br />
        <button type="submit" className="calculate-button">Calculate</button> {/* Apply styles to the button */}
      </form>
      {error && <p className="error-message">{error}</p>} {/* Apply styles to the error message */}
      {result && <p className="result-message">Result: {result}</p>} {/* Apply styles to the result message */}

            <div className='logout-div'>
                   <LogoutButton />

            </div>

    </div>
  );
};

export default CalculatorForm;
