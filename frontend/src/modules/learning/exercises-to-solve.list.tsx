import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { IRootState } from "../../store";
import { LinkContainer } from "react-router-bootstrap";
import { Alert, Button, Table } from "react-bootstrap";
import FlashState from "../../flashstate";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExerciseTypesEnum } from "../../enums/exercise-types.enum";
import { IClosedQuestionExercise } from "../../models/closed-question-exercise.model";
import { IListeningExercise } from "../../models/listening-exercise.model";
import { IOpenQuestionExercise } from "../../models/open-question-exercise.model";
import { ISpeakingExercise } from "../../models/speaking-exercise.model";
import { getPupilExercises, reset } from "../../store/learning/actions";

export interface IExercisesToSolveListProps extends StateProps, DispatchProps { }

export interface IExercisesToSolveListStates {
  successMessage: string;
}

class ExercisesToSolveList extends Component<
  IExercisesToSolveListProps,
  IExercisesToSolveListStates
  > {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: "",
    };
  }

  componentDidMount() {
    this.props.reset();

    const loggedInUser = localStorage.getItem("user");
    this.props.getPupilExercises(loggedInUser);
    this.setState({ successMessage: FlashState.get("message") });
  }

  render() {
    const { exercises } = this.props;
    return (
      <div>
        {this.state.successMessage ? (
          <Alert variant="success">{this.state.successMessage}</Alert>
        ) : null}
        <p>List of your exercises:</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{exercise.name}</td>
                  <td>
                    <LinkContainer to={"/exercises-to-solve/" + exercise.author + "/" + exercise.name}>
                      <Button variant="success">
                        Solve
                      </Button>
                    </LinkContainer>
                    <i className="mr-2"></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ learning }: IRootState) => ({
  exercises: learning.exercises,
});

const mapDispatchToProps = {
  getPupilExercises,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesToSolveList);

