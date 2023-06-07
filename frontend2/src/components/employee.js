import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Employee = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');

  const handleToggle = () => {
    if (loggedIn) {
      setTimeOut(new Date().toLocaleTimeString()); // Set the current time as time-out
      setLoggedIn(false);
    } else {
      setTimeIn(new Date().toLocaleTimeString()); // Set the current time as time-in
      setLoggedIn(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an object with the time data
    const timeData = {
      timeIn: timeIn,
      timeOut: timeOut,
      loggedIn: loggedIn,
    };

    // Send a POST request to the backend API endpoint
    axios
      .post('/api/submitTime', timeData)
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });

    // Reset the form
    setTimeIn('');
    setTimeOut('');
  };

  return (
    <div className="employee">
      <h1>TimeStamp</h1>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={handleToggle}>
          {loggedIn ? 'Logout' : 'Login'}
        </button>
        {loggedIn ? (
          <input
            type="text"
            value={timeOut}
            placeholder="Time Out"
            disabled
          />
        ) : (
          <input
            type="text"
            value={timeIn}
            placeholder="Time In"
            disabled
          />
        )}
        {loggedIn && <button type="submit">Submit</button>}
      </form>
    </div>
  );
};

export default Employee;

