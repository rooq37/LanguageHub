import React from "react";
import { Component } from "react";
import { Alert, Form } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../enums/exercise-types.enum";
import { IExercise } from "../../models/exercise.model";
import { IRootState } from "../../store";
import ExerciseForm from "./exercise-form/exercise-form";
import { connect } from "react-redux";
import { createExercise } from "../../store/exercise/actions";

export interface ICreateExerciseStates {
  exerciseType: ExerciseTypesEnum;
}

export interface ICreateExerciseProps extends StateProps, DispatchProps {}

class CreateExercise extends Component<
  ICreateExerciseProps,
  ICreateExerciseStates
> {
  constructor(props) {
    super(props);
    this.state = {
      exerciseType: ExerciseTypesEnum.OPEN_QUESTION,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleExerciseTypeChange(event) {
    this.setState({ exerciseType: event.target.value });
  }

  handleSubmit(exercise: IExercise) {
    this.props.createExercise(exercise);
  }

  render() {
    const { exerciseType } = this.state;
    const { infoResponse } = this.props;
    return (
      <React.Fragment>
        {infoResponse ? (
          <Alert variant={infoResponse.success ? "success" : "danger"}>
            {infoResponse.messageText}
          </Alert>
        ) : null}
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
        <ExerciseForm
          exerciseType={exerciseType}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ exercise }: IRootState) => ({
  infoResponse: exercise.infoResponse,
});

const mapDispatchToProps = {
  createExercise,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CreateExercise);
