import React from "react";
import { Component } from "react";
import { Card, CardGroup } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <h4>Welcome to the LanguageHub portal.</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
          congue mauris. Proin condimentum tempus dolor, et gravida arcu. Sed
          mauris lacus, finibus at fringilla sit amet, consectetur in elit.
        </p>
        <CardGroup>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Lorem ispum 1</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Lorem ispum 1
              </Card.Subtitle>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                quis congue mauris. Proin condimentum tempus dolor, et gravida
                arcu. Sed mauris lacus, finibus at fringilla sit amet,
                consectetur in elit. Suspendisse volutpat nisi vel nibh
                consectetur, a lacinia dui iaculis. Duis semper ligula faucibus
                augue pharetra mattis.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Lorem ispum 2</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Lorem ispum 2
              </Card.Subtitle>
              <Card.Text>
                Morbi lacinia purus nec nibh semper semper. Integer dignissim
                venenatis ex, id rutrum massa. Integer nulla arcu, ullamcorper
                vitae venenatis viverra, porta vitae ligula. Etiam tempor nunc
                eget erat accumsan ornare. Integer id dolor vestibulum, posuere
                mauris non, egestas leo. In commodo leo non enim scelerisque,
                pharetra posuere elit ullamcorper.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Lorem ispum 3</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Lorem ispum 3
              </Card.Subtitle>
              <Card.Text>
                Quisque ullamcorper eu eros dictum pulvinar. Fusce at gravida
                risus. Phasellus vel condimentum quam. Nam viverra urna tortor,
                luctus congue erat eleifend pharetra. Aenean mollis nibh sed
                egestas fermentum. Non fermentum sapien. Vestibulum mi odio,
                hendrerit eu nisi at, euismod maximus odio.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </React.Fragment>
    );
  }
}

export default Home;
