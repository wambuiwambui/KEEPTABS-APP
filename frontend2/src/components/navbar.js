import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth';

const NavBar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Homepage
        </Navbar.Brand>
        <Nav className="me-auto">
          {!isAuthenticated && (
            <>
              <Nav.Link
                as={Link}
                to="/signup"
                active={location.pathname === '/signup'}
              >
                SignUp
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                active={location.pathname === '/login'}
              >
                Login
              </Nav.Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Nav.Link
                as={Link}
                to="/timestamp"
                active={location.pathname === '/employee'}
              >
                employee
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/logout"
                active={location.pathname === '/logout'}
              >
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;



