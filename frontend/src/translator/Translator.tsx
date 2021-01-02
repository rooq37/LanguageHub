import React from "react";
import { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

class Translator extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>
                Please input your text for translation below:
              </Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Language</Form.Label>
              <Form.Control as="select">
                <option>Polski -{">"} Angielski</option>
                <option>English -{">"} Polish</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary">Translate</Button>
          </Col>
          <Col>
            Output:
            <p>HERE</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Translator;
