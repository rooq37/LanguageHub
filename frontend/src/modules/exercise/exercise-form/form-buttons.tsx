import React from "react";
import { Component } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class FormButtons extends Component {
  render() {
    return (
      <React.Fragment>
        <Button variant="primary" type="submit">
          Save
        </Button>
        <i className="mr-1"></i>
        <LinkContainer to="/exercises">
          <Button variant="danger">Cancel</Button>
        </LinkContainer>
      </React.Fragment>
    );
  }
}
export default FormButtons;
