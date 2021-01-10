import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { IRootState } from "../../store";
import {
  getAllExercises,
  reset,
  deleteExercise,
} from "../../store/exercise/actions";
import { LinkContainer } from "react-router-bootstrap";
import { Alert, Button, Table } from "react-bootstrap";
import FlashState from "../../flashstate";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  render() {
    const { exercises } = this.props;
    return (
      <div>
        {this.state.successMessage ? (
          <Alert variant="success">{this.state.successMessage}</Alert>
        ) : null}
        <p>List of exercises created by you:</p>
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
                    <LinkContainer to={"/exercises/edit/" + exercise.name}>
                      <Button variant="warning">
                        <FontAwesomeIcon className="text-white" icon={faPen} />
                      </Button>
                    </LinkContainer>
                    <i className="mr-2"></i>
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
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesList);
