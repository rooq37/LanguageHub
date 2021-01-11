import React from "react";
import "./open-question-exercise-form.css";
import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { ISolution } from "../../../../models/learning/solution.model";
import { IOpenQuestionExerciseForPupil } from "../../../../models/learning/open-question-exercise.model";

export interface IPropsOpenQuestionExerciseForm {
  exercise: IOpenQuestionExerciseForPupil;
  handleSubmit;
}
export interface IStatesOpenQuestionExerciseForm {
  solution: ISolution;
  validated: boolean;
}
class OpenQuestionExerciseForm extends Component<
  IPropsOpenQuestionExerciseForm,
  IStatesOpenQuestionExerciseForm
> {
  constructor(props) {
    super(props);
    const { exercise } = this.props;
    this.state = {
      solution: {
        pupilName: "",
        exerciseName: exercise.name,
        exerciseType: exercise["@type"],
        answers: [],
      },
      validated: false,
    };
  }

  handleInput(e) {
    const solution = this.state.solution;
    if (!solution.answers[0]) {
      solution.answers.push(e.target.value);
    } else {
      solution.answers[0] = e.target.value;
    }
    this.setState({ solution: solution });
  }

  handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      this.props.handleSubmit(this.state.solution);
    }

    this.setState({ validated: true });
  }

  render() {
    return (
      <React.Fragment>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <p className="exerciseOpenTitle">{this.props.exercise.name}</p>
          <p className="exerciseOpenQuestion">{this.props.exercise.question}</p>
          <Form.Group controlId="formOpenExerciseAnswer">
            <Form.Control
              type="plaintext"
              onChange={(e) => this.handleInput(e)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter the answer.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default OpenQuestionExerciseForm;
