import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import employee from './employee'
import { useAuth } from '../auth';


const LoggedInHome = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('/employee/employees')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setEmployees(data); // Update the state with fetched data
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="employees">
      <h3>List of employees</h3>
      {/* Render the employees data */}
      {employees.map(employee => (
        <div key={employee.id}>{employee.name}</div>
      ))}
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="homepage container">
      <h1 className="heading">Welcome to Keeptabs</h1>
      <Link to="/signup" className="btn btn-submit btn-primary btn-lg">
        Get started
      </Link>
    </div>
  );
};

export default HomePage;
