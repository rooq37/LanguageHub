import React from "react";
import { Component } from "react";
import { Alert } from "react-bootstrap";
import ExerciseForm from "./exercise-form/exercise-form";
import { ISolution } from "../../models/learning/solution.model";
import { connect } from "react-redux";
import { createSolution } from "../../store/learning/actions";
import { Redirect } from "react-router-dom";
import { IRootState } from "../../store";
import FlashState from "../../flashstate";
import { IExerciseForPupil } from "../../models/learning/exercise-for-pupil.model";

export interface ISolveExerciseProps
  extends StateProps,
    DispatchProps {}


class SolveExercise extends Component<ISolveExerciseProps> {
  exercise: IExerciseForPupil;
  constructor(props) {
    super(props);
    this.exercise = props.location.state ? props.location.state.exercise : null;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(solution: ISolution) {
    console.log(solution);
    solution.pupilName = localStorage.getItem("user");
    this.props.createSolution(solution);
  }

  checkIfSuccess() {
    const { infoResponse } = this.props;
    if (infoResponse) {
      if (infoResponse.success) {
        FlashState.set("message", infoResponse.messageText);
        return <Redirect to="/exercises-to-solve" />;
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
    const exercise = this.exercise;
        return (
          <React.Fragment>
            {this.checkIfSuccess()}
            {exercise ? (
              <ExerciseForm
                handleSubmit={this.handleSubmit}
                exercise={exercise}

              />
            ) : null}
          </React.Fragment>
        );
      
  }
}


const mapStateToProps = ({ learning }: IRootState) => ({
  infoResponse: learning.infoResponse,
  solution: learning.solution
});

const mapDispatchToProps = {
  createSolution
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SolveExercise);


