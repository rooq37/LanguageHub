import React from "react";
import "./listening-exercise-form.css";
import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../../../enums/exercise-types.enum";
import { IListeningExercise } from "../../../../models/listening-exercise.model";
import { ISolution } from "../../../../models/solution.model";

export interface IPropsListeningExerciseForm {
  exercise: IListeningExercise;
  handleSubmit;
}
export interface IStatesListeningExerciseForm {
  solution: ISolution;
}
class ListeningExerciseForm extends Component<
  IPropsListeningExerciseForm,
  IStatesListeningExerciseForm
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
    this.props.handleSubmit(this.state.solution);
  }

  render() {
    return (
      <React.Fragment>
        <Form.Group controlId="formBasicPassword">
        <p className="exerciseListenTitle">Exercise</p>
        <p className="exerciseListenQuestion">Listen and write</p>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Control type="plaintext" onChange={e => this.handleInput(e)}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={e => this.handleSubmit(e)}>
          Save
        </Button>
      </React.Fragment>
    );
  }
}

export default ListeningExerciseForm;
