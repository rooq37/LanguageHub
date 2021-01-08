import React from "react";
import { Component } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export interface ITranslatorStates {
  usernameSelect: string;
}

class Login extends Component<{}, ITranslatorStates> {
  constructor(props) {
    super(props);
    this.state = {
      usernameSelect: "Meffiu",
    };
  }

  login() {
    localStorage.setItem("user", this.state.usernameSelect);
  }

  handleUserChange(event) {
    this.setState({ usernameSelect: event.target.value });
  }

  render() {
    const loggedInUser = localStorage.getItem("user");
    return loggedInUser ? (
      <Alert variant="warning">Please logout before login!</Alert>
    ) : (
      <Form>
        <p className="text-center">
          <b>Please select your user from predefined:</b>
          <br />
          Note: all roles (lecturer as well ;)) are disabled now.
        </p>
        <Row>
          <Col sm={3}></Col>
          <Col>
            <Form.Group>
              <Form.Control
                as="select"
                defaultValue={this.state.usernameSelect}
                onChange={this.handleUserChange.bind(this)}
              >
                <option value="Meffiu">Meffiu (lecturer)</option>
                <option value="Andrzej">Andrzej (lecturer)</option>
                <option value="Stachu">Stachu (lecturer)</option>
                <option value="Tomo">Tomo (lecturer)</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <LinkContainer to="/">
              <Button variant="primary" onClick={this.login.bind(this)}>
                Login
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Login;
