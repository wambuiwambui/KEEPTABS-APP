import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css'
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage'; 
import SignUp from './components/SignUp';
import Login from './components/Login';
import Employee from './components/employee';

const App = () => {
  return (
    <>
      <Router>
      <div className="background">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </div>
    </Router>
    </>
    
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

