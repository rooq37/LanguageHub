import React from "react";
import "./closed-question-exercise-form.css";
import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { ISolution } from "../../../../models/learning/solution.model";
import { IClosedQuestionExerciseForPupil } from "../../../../models/learning/closed-question-exercise.model";
import { LinkContainer } from "react-router-bootstrap";

export interface IPropsClosedQuestionExerciseForm {
  exercise: IClosedQuestionExerciseForPupil;
  handleSubmit;
}
export interface IStatesClosedQuestionExerciseForm {
  solution: ISolution;
  validated: boolean;
  requiredCheckbox: boolean;
}
class ClosedQuestionExerciseForm extends Component<
  IPropsClosedQuestionExerciseForm,
  IStatesClosedQuestionExerciseForm
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
      requiredCheckbox: true,
    };
  }

  handleClosedAnswerChanged(e, element) {
    const solution = this.state.solution;
    if (element) {
      const index = solution.answers.indexOf(element);
      if (index === -1 && e.target.checked) {
        solution.answers.push(element);
      } else if (index !== -1 && !e.target.checked) {
        solution.answers.splice(index, 1);
      }

      this.setState({
        solution: solution,
        requiredCheckbox: solution.answers.length === 0,
      });
    }
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
    const { exercise } = this.props;
    return (
      <React.Fragment>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <p className="exerciseClosedTitle">{this.props.exercise.name}</p>
          <p className="exerciseClosedQuestion">{exercise.question}</p>

          <Form.Group>
            {exercise.answers.map((answer, key) => {
              return (
                <Form.Check>
                  <Form.Check.Input
                    required={this.state.requiredCheckbox}
                    onChange={(e) => this.handleClosedAnswerChanged(e, answer)}
                  />
                  <Form.Check.Label>{answer}</Form.Check.Label>
                  <Form.Control.Feedback type="invalid">
                    Please check any checkbox.
                  </Form.Control.Feedback>
                </Form.Check>
              );
            })}
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <i className="mr-1"></i>
          <LinkContainer to="/exercises-to-solve">
            <Button variant="danger">Cancel</Button>
          </LinkContainer>
        </Form>
      </React.Fragment>
    );
  }
}

export default ClosedQuestionExerciseForm;
