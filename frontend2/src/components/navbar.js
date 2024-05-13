import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, logout } from '../auth';

const NavBar = () => {
  const location = useLocation();
  const logged = useAuth()[0];
  
  console.log("isAuthenticated: ", logged)
  return (
    <Navbar bg="dark" variant="dark" id="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Homepage
        </Navbar.Brand>
        <Nav className="me-auto" id="nav">
          <Nav.Link
            as={Link}
            to="/employee"
            active={location.pathname === '/employee'}>
            Employee
          </Nav.Link>
          {!logged ? (
            <>
              <Nav.Link
                as={Link}
                to="/signup"
                active={location.pathname === '/signup'}>
                SignUp
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                active={location.pathname === '/login'}>
                Login
              </Nav.Link>
            </>
          ) : (
            <Nav.Link
              as={Link}
              to="/login"
              active={location.pathname === '/logout'}
              onClick={logout}>
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;



