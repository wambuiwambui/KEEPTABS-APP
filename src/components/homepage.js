import React from 'react';
import { Link } from 'react-router-dom';
import timeTracker from './images/time-tracking.png'
import attendanceManagement from './images/attendance-management.png' 
import workHour from './images/work-hour-calculation.png'
const Features = () => {
  return (
    <div className="features">
      <h2>Key Features of Keeptabs App:</h2>
      <ul>
        <li>Time Tracking:</li>
        <li>Attendance Management</li>
        <li>Work Hour Calculation: </li>
        
      </ul>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="homepage container">
      <h1 className="heading">Welcome to Keeptabs</h1>
      <br />
      <p>
        Get ready to clock in and rock on with our employee app! We've got your info covered and your time logged, so you can focus on doing what you do best - making work a party!.
      </p>

      <Features />

      <div className="illustration">
        <img src={timeTracker} alt="Time Tracking" height={100} />
        <img src={attendanceManagement} alt="Attendance Management" height={100} />
        <img src={workHour} alt="Work Hour Calculation" height={100} />
      
      </div>

      <Link to="/signup" className="btn btn-submit btn-primary btn-lg">
        Get started
      </Link>
    </div>
  );
};

export default HomePage;


