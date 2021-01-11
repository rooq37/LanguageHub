import React from "react";
import { Component } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UserRolesEnum } from "../../enums/user-roles-enum";

export interface ITranslatorStates {
  usernameSelect: string;
}

class Login extends Component<{}, ITranslatorStates> {
  constructor(props) {
    super(props);
    this.state = {
      usernameSelect: this.predefinedUsers[0].name,
    };
  }

  predefinedUsers = [
    {
      name: "John",
      role: UserRolesEnum.LECTURER,
    },
    {
      name: "Lisa",
      role: UserRolesEnum.LECTURER,
    },
    {
      name: "Brian",
      role: UserRolesEnum.LECTURER,
    },
    {
      name: "Marta M",
      role: UserRolesEnum.PUPIL,
    },
    {
      name: "Mateusz P",
      role: UserRolesEnum.PUPIL,
    },
    {
      name: "Krzysztof Z",
      role: UserRolesEnum.PUPIL,
    },
  ];

  login() {
    let user = this.predefinedUsers.find(
      (u) => u.name === this.state.usernameSelect
    );
    localStorage.setItem("user", user.name);
    localStorage.setItem("role", user.role);
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
                {this.predefinedUsers.map((user, key) => {
                  return (
                    <option key={key} value={user.name}>
                      {user.name + " (" + user.role + ")"}
                    </option>
                  );
                })}
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
