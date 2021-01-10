import React from "react";
import { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../enums/exercise-types.enum";
import ExerciseForm from "./exercise-form/exercise-form";
import { IClosedQuestionExercise } from "../../models/closed-question-exercise.model";
import { ISolution } from "../../models/solution.model";
import { connect } from "react-redux";
import { getExercise } from "../../store/exercise/actions";
import { createSolution } from "../../store/learning/actions";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { IRootState } from "../../store";
import FlashState from "../../flashstate";
import { IExercise } from "../../models/exercise.model";

export interface MatchParams {
  exerciseName: string;
  authorName: string;
}

export interface ISolveExerciseProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}


class SolveExercise extends Component<ISolveExerciseProps> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const loggedInUser = localStorage.getItem("user");
    const {
      match: { params },
    } = this.props;
    this.props.getExercise(params.exerciseName, params.authorName);
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
    const { exercise } = this.props;
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


const mapStateToProps = ({ learning, exercise }: IRootState) => ({
  infoResponse: learning.infoResponse,
  solution: learning.solution,
  exercise: exercise.exercise
});

const mapDispatchToProps = {
  createSolution,
  getExercise,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SolveExercise);


