import React from "react";
import { Component } from "react";
import { Card } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default Home;
