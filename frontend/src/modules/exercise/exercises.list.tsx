import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { IRootState } from "../../store";
import {
  getAllExercises,
  reset,
  deleteExercise,
  assignToExercise,
} from "../../store/exercise/actions";
import { LinkContainer } from "react-router-bootstrap";
import { Alert, Button, Table } from "react-bootstrap";
import FlashState from "../../flashstate";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AssignExercise from "./assign-exercise";
import { ExerciseTypesEnum } from "../../enums/exercise-types.enum";

export interface IExercisesListProps extends StateProps, DispatchProps {}

export interface IExercisesListStates {
  successMessage: string;
}

class ExercisesList extends Component<
  IExercisesListProps,
  IExercisesListStates
> {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: "",
    };
    this.saveAssignation = this.saveAssignation.bind(this);
  }

  componentDidMount() {
    this.props.reset();

    const loggedInUser = localStorage.getItem("user");
    this.props.getAllExercises(loggedInUser);
    this.setState({ successMessage: FlashState.get("message") });
  }

  deleteExercise(exerciseName: string) {
    const { deleteExercise } = this.props;
    const loggedInUser = localStorage.getItem("user");
    deleteExercise(exerciseName, loggedInUser);
  }

  saveAssignation(key, pupilNames: string[]) {
    const { assignToExercise, exercises } = this.props;
    const loggedInUser = localStorage.getItem("user");
    const exercise = exercises[key];
    assignToExercise(exercise.name, loggedInUser, pupilNames);
  }

  render() {
    const { exercises } = this.props;
    return (
      <div>
        {this.state.successMessage ? (
          <Alert variant="success">{this.state.successMessage}</Alert>
        ) : null}
        <p>
          <b>List of exercises created by you:</b>
        </p>
        <Table striped hover>
          <thead>
            <tr className="d-flex">
              <th className="col-1">#</th>
              <th className="col-2">Name</th>
              <th className="col-2">Type</th>
              <th className="col-5">Assign</th>
              <th className="col-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => {
              return (
                <tr key={index} className="d-flex">
                  <td className="col-1">{index + 1}</td>
                  <td className="col-2">{exercise.name}</td>
                  <td className="col-2">{exercise["@type"]}</td>
                  <td className="col-5">
                    <AssignExercise
                      pupils={exercise.pupils}
                      saveAssignation={this.saveAssignation}
                      id={index}
                    />
                  </td>
                  <td className="col-2">
                    <LinkContainer to={"/exercises/edit/" + exercise.name}>
                      <Button variant="warning">
                        <FontAwesomeIcon className="text-white" icon={faPen} />
                      </Button>
                    </LinkContainer>
                    <i className="mr-3"></i>
                    <Button
                      variant="danger"
                      onClick={() => this.deleteExercise(exercise.name)}
                    >
                      <FontAwesomeIcon className="text-white" icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <LinkContainer to="/exercises/new">
          <Button variant="primary">Create new exercise</Button>
        </LinkContainer>
      </div>
    );
  }
}

const mapStateToProps = ({ exercise }: IRootState) => ({
  exercises: exercise.exercises,
});

const mapDispatchToProps = {
  getAllExercises,
  deleteExercise,
  assignToExercise,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesList);
