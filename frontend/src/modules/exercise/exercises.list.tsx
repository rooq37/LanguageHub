import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { IRootState } from "../../store";
import { getAllExercises } from "../../store/exercise/actions";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

export interface IExercisesListProps extends StateProps, DispatchProps {}

class ExercisesList extends Component<IExercisesListProps> {
  componentDidMount() {
    const loggedInUser = localStorage.getItem("user");
    this.props.getAllExercises(loggedInUser);
  }

  render() {
    const { exercises } = this.props;
    return (
      <div>
        Exercise List
        {exercises.map((anObjectMapped, index) => {
          return (
            <p key={`${anObjectMapped.name}`}>
              {anObjectMapped.name} - {anObjectMapped["@type"]}
            </p>
          );
        })}
        <LinkContainer to="/exercises/new">
          <Button variant="outline-secondary">New</Button>
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
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesList);
