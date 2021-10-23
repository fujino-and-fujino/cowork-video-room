import React from 'react'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const Header = () => (
  <Navbar className="shadow" bg="light" variant="light">
    <Container>
      <Navbar.Brand href="/">Cowork Video Room</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#sign-up">Sign Up</Nav.Link>
        <Nav.Link href="#sign-in">Sign In</Nav.Link>
      </Nav>
    </Container>
  </Navbar>


)

export default Header;
