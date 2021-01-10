import React from "react";
import "./open-question-exercise-form.css";
import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { ISolution } from "../../../../models/solution.model";
import { IOpenQuestionExercise } from "../../../../models/open-question-exercise.model";

export interface IPropsOpenQuestionExerciseForm {
  exercise: IOpenQuestionExercise;
  handleSubmit;
}
export interface IStatesOpenQuestionExerciseForm {
  solution: ISolution;
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
        answers: []
      }
    }
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
    this.props.handleSubmit(this.state.solution);
  }

  render() {
    return (
      <React.Fragment>
        <Form.Group controlId="formOpenExerciseQuestion">
          <p className="exerciseOpenTitle">Exercise</p>
          <p className="exerciseOpenQuestion">{this.props.exercise.question}</p>
        </Form.Group>
        <Form.Group controlId="formOpenExerciseAnswer">
          <Form.Control type="plaintext" onChange={e => this.handleInput(e)}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={e => this.handleSubmit(e)}>
          Save
        </Button>
      </React.Fragment>
    );
  }
}

export default OpenQuestionExerciseForm;
