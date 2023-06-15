import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, logout } from '../auth';


const NavBar = () => {
  const location = useLocation();//access to users current location
  const logged = useAuth()[0];//info on whether user is logged in or out
  
  console.log("isAuthenticated: ", logged) //logs value of logged

  //xml code on navbar structure
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Homepage
        </Navbar.Brand>

        <Nav className="me-auto">
        {logged && (
          <Nav.Link
            as={Link}
            to="/employee"
            active={location.pathname === '/employee'}
          >
            Employee
          </Nav.Link>
        )}
          {!logged ? (
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
          ) : (
            <Nav.Link
              as={Link}
              to="/login"
              active={location.pathname === '/logout'}
              onClick={logout}
            >
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar; //sets navbar as the default export of the module



