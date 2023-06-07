import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth';

const Logout = () => {
  const history = useHistory();
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
