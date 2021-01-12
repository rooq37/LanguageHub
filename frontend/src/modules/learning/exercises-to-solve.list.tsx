import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { IRootState } from "../../store";
import { Alert, Button, Table } from "react-bootstrap";
import FlashState from "../../flashstate";
import { getPupilExercises, reset } from "../../store/learning/actions";
import { Link } from "react-router-dom";

export interface IExercisesToSolveListProps extends StateProps, DispatchProps {}

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

  getClassForPercentage(percentageScore) {
    if (percentageScore <= 0.25) {
      return "text-danger";
    } else if (percentageScore >= 0.75) {
      return "text-success";
    }
    return null;
  }

  orderExercises(exercises) {
    return exercises
      ? exercises
          .filter((e) => !e.solved)
          .concat(exercises.filter((e) => e.solved))
      : [];
  }

  render() {
    const { exercises } = this.props;
    return (
      <div>
        {this.state.successMessage ? (
          <Alert variant="success">{this.state.successMessage}</Alert>
        ) : null}
        <p>List of your exercises:</p>
        <Table striped hover>
          <thead>
            <tr className="d-flex">
              <th className="col-1">#</th>
              <th className="col-3">Name</th>
              <th className="col-4">Type</th>
              <th className="col-2">Options</th>
              <th className="col-2">Result</th>
            </tr>
          </thead>
          <tbody>
            {this.orderExercises(exercises).map((exercise, index) => {
              return (
                <tr key={index} className="d-flex">
                  <td className="col-1">{index + 1}</td>
                  <td className="col-3">{exercise.name}</td>
                  <td className="col-4">{exercise["@type"]}</td>
                  <td className="col-2">
                    <Link
                      to={{
                        pathname: "/exercises-to-solve/solve",
                        state: { exercise: exercise },
                      }}
                    >
                      {exercise.solved ? (
                        <Button variant="secondary" disabled>
                          Solve
                        </Button>
                      ) : (
                        <Button variant="success">Solve</Button>
                      )}
                    </Link>
                    <i className="mr-2"></i>
                  </td>
                  <td className="col-2">
                    {exercise.solved ? (
                      <b
                        className={this.getClassForPercentage(
                          exercise.percentageScore
                        )}
                      >
                        {" "}
                        {exercise.percentageScore * 100 + "%"}{" "}
                      </b>
                    ) : null}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercisesToSolveList);
