import React from "react";
import { Component } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

class Navigation extends Component<RouteComponentProps> {
  logout() {
    localStorage.clear();
  }

  render() {
    const loggedInUser = localStorage.getItem("user");
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
            {loggedInUser ? (
              <LinkContainer to="/exercises" activeClassName="is-active">
                <Nav.Link>Exercises</Nav.Link>
              </LinkContainer>
            ) : null}
            <LinkContainer to="/about" activeClassName="is-active">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          {loggedInUser ? (
            <React.Fragment>
              <b className="text-light mr-3">Hello {loggedInUser}! </b>
              <LinkContainer to="/login">
                <Button
                  variant="outline-secondary"
                  onClick={this.logout.bind(this)}
                >
                  Logout
                </Button>
              </LinkContainer>
            </React.Fragment>
          ) : (
            <LinkContainer to="/login">
              <Button variant="outline-secondary">Login</Button>
            </LinkContainer>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Navigation);
