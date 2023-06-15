import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth';

//initialize the history object and logout 
const Logout = () => {
  const history = useHistory();
  const { logout } = useAuth();
  
  //handles logout logic
  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');//redirects user to login
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  //javascript xml for structure
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};


export default Logout; //logout the default export module
