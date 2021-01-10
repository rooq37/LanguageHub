import React from "react";
import { Component } from "react";
import { Alert } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../enums/exercise-types.enum";
import ExerciseForm from "./exercise-form/exercise-form";
import { IClosedQuestionExercise } from "../../models/closed-question-exercise.model";
import { ISolution } from "../../models/solution.model";
import { connect } from "react-redux";
import { getExercise } from "../../store/exercise/actions";
import { createSolution } from "../../store/solution/actions";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { IRootState } from "../../store";
import FlashState from "../../flashstate";

export interface MatchParams {
  exerciseName: string;
}

export interface ISolveExerciseProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<MatchParams> {}


class SolveExercise extends Component<ISolveExerciseProps> {
  constructor(props) {
    super(props);
    this.state = {
      solution: {
        solution: {},
        infoResponse: {}
      }
    }
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

  handleSubmit(solution: ISolution) {
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
    const { exercise } = {
      exercise: {
          "@type": ExerciseTypesEnum.CLOSED_QUESTION,
          author: "Meffiu",
          question: "Czy lubisz placki?",
          closedAnswers:[
            {
              answer: "tak",
              correct: true
            },
            {
              answer: "nie",
              correct: false
            }],
        } as IClosedQuestionExercise};
        return (
          <React.Fragment>
            {this.checkIfSuccess()}
            {exercise ? (
              <ExerciseForm
                exerciseNumber={1}
                handleSubmit={this.handleSubmit}
                exercise={exercise}
              />
            ) : null}
          </React.Fragment>
        );
      
  }
}


const mapStateToProps = ({ solution }: IRootState) => ({
  infoResponse: solution.infoResponse,
  solution: solution.solution
});

const mapDispatchToProps = {
  getExercise,
  createSolution,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SolveExercise);


