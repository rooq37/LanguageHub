import React from "react";
import { Component } from "react";
import { Alert } from "react-bootstrap";
import { IExercise } from "../../models/exercise.model";
import { IRootState } from "../../store";
import ExerciseForm from "./exercise-form/exercise-form";
import { connect } from "react-redux";
import { updateExercise, getExercise } from "../../store/exercise/actions";
import { Redirect, RouteComponentProps } from "react-router-dom";
import FlashState from "../../flashstate";

export interface MatchParams {
  exerciseName: string;
}

export interface IEditExerciseProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}

class EditExercise extends Component<IEditExerciseProps> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const loggedInUser = localStorage.getItem("user");
    const {
      match: { params },
    } = this.props;
    console.log(params.exerciseName);
    this.props.getExercise(params.exerciseName, loggedInUser);
  }

  handleExerciseTypeChange(event) {
    this.setState({ exerciseType: event.target.value });
  }

  handleSubmit(exercise: IExercise) {
    this.props.updateExercise(exercise);
  }

  checkIfSuccess() {
    const { infoResponse } = this.props;
    if (infoResponse) {
      if (infoResponse.success) {
        FlashState.set("message", infoResponse.messageText);
        return <Redirect to="/exercises" />;
      } else {
        return (
          <Alert variant="danger">
            {infoResponse.messageText
              ? infoResponse.messageText
              : "Something went wrong."}
          </Alert>
        );
      }
    }
    return null;
  }

  render() {
    const { exercise } = this.props;
    return (
      <React.Fragment>
        {this.checkIfSuccess()}
        {exercise ? (
          <ExerciseForm
            exerciseType={exercise["@type"]}
            handleSubmit={this.handleSubmit}
            exercise={exercise}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ exercise }: IRootState) => ({
  infoResponse: exercise.infoResponse,
  exercise: exercise.exercise,
});

const mapDispatchToProps = {
  getExercise,
  updateExercise,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EditExercise);
