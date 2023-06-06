import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Employee = () => {
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');

  const handleTimeInChange = (event) => {
    setTimeIn(event.target.value);
  };

  const handleTimeOutChange = (event) => {
    setTimeOut(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Create an object with the time data
    const timeData = {
      timeIn: timeIn,
      timeOut: timeOut
    };

    // Send a POST request to the backend API endpoint
    axios.post('/api/submitTime', timeData)
      .then(response => {
        // Handle the response if needed
        console.log(response.data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });

    // Reset the form
    setTimeIn('');
    setTimeOut('');
  };

  return (
    <div className='employee'>
      <h1>TimeStamp</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="timeIn">Time In:</label>
          <input
            type="text"
            id="timeIn"
            value={timeIn}
            onChange={handleTimeInChange}
          />
        </div>
        <div>
          <label htmlFor="timeOut">Time Out:</label>
          <input
            type="text"
            id="timeOut"
            value={timeOut}
            onChange={handleTimeOutChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Employee;

