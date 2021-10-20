import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

ReactDOM.render(
  <React.StrictMode>
  <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand href="#home">Cowork Video Room</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Sign Up</Nav.Link>
      <Nav.Link href="#pricing">Sign In</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  {/*
  <Button variant="outline-primary">Enter Room</Button>
  */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
