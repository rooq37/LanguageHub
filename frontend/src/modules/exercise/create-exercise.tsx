import React from "react";
import { Component } from "react";
import { Form } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../enums/exercise-types.enum";
import { IExercise } from "../../models/exercise.model";
import ExerciseForm from "./exercise-form/exercise-form";

export interface ICreateExerciseStates {
  exerciseType: ExerciseTypesEnum;
  exercise: IExercise;
}

class CreateExercise extends Component<{}, ICreateExerciseStates> {
  constructor(props) {
    super(props);
    this.state = {
      exerciseType: ExerciseTypesEnum.OPEN_QUESTION,
      exercise: {},
    };
  }

  handleExerciseTypeChange(event) {
    this.setState({ exerciseType: event.target.value });
  }

  render() {
    const { exerciseType, exercise } = this.state;
    return (
      <React.Fragment>
        <Form.Group>
          <Form.Control
            as="select"
            onChange={this.handleExerciseTypeChange.bind(this)}
            defaultValue={exerciseType}
          >
            {Object.keys(ExerciseTypesEnum).map((key) => (
              <option key={key} value={ExerciseTypesEnum[key]}>
                {ExerciseTypesEnum[key]}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <ExerciseForm exerciseType={exerciseType} exercise={exercise} />
      </React.Fragment>
    );
  }
}

export default CreateExercise;
