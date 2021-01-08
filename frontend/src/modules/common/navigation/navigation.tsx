import React from "react";
import { Component } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  Link,
  NavLink,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";

class Navigation extends Component<RouteComponentProps> {
  render() {
    return (
      <Navbar bg="primary" expand="lg" className="navbar-dark">
        <Navbar.Brand href="/">LanguageHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/" exact={true} activeClassName="is-active">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/translator" activeClassName="is-active">
              <Nav.Link>Translator</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about" activeClassName="is-active">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <LinkContainer to="/login">
            <Button variant="outline-secondary">Login</Button>
          </LinkContainer>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Navigation);
