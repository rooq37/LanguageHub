import React from "react";
import "./listening-exercise-form.css";
import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { ISolution } from "../../../../models/learning/solution.model";
import { IListeningExerciseForPupil } from "../../../../models/learning/listening-exercise.model";

export interface IListeningExerciseFormProps {
  exercise: IListeningExerciseForPupil;
  handleSubmit;
}
export interface IListeningExerciseFormStates {
  solution: ISolution;
  validated: boolean;
}
class ListeningExerciseForm extends Component<
IListeningExerciseFormProps,
IListeningExerciseFormStates
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
      },
      validated: false
    };
  }

  handleInput(e) {
    const { solution } = this.state;
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
    const { encodedSound } = this.props.exercise;
    return (
      <React.Fragment>
        <Form
          validated={this.state.validated}
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <p className="exerciseListenTitle">{this.props.exercise.name}</p>
          <p className="exerciseListenQuestion">Listen and write</p>
          <div>
              {encodedSound ? (
                <audio src={"data:audio/mp3;base64," + encodedSound} controls />
              ) : ("Sound not found")}
            </div>
          <Form.Group controlId="formListening">
            <Form.Control
              required
              type="plaintext"
              onChange={e => this.handleInput(e)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default ListeningExerciseForm;