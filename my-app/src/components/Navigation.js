import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Navigation.css';

const Navigation = () => (
  <Navbar expand="lg" className="navigation">
    <Container>
      <Navbar.Brand href="/">UNCollaboration</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/tasks">Tasks</Nav.Link>
          <Nav.Link href="/projects">Projects</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;

