import React from "react";
import "./listening-exercise-form.css";
import { Component } from "react";
import { Form } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../../../enums/exercise-types.enum";
import { IListeningExercise } from "../../../../models/listening-exercise.model";
import { ISolution } from "../../../../models/solution.model";

export interface IPropsListeningExerciseForm {
  exerciseNumber: Number;
  exercise: IListeningExercise;
  handleSubmit;
}
export interface IStatesListeningExerciseForm {
  solution: ISolution;
}
class ListeningExerciseForm extends Component<
  IPropsListeningExerciseForm,
  IStatesListeningExerciseForm
> {
  constructor(props) {
    super(props);
    this.state = {
      solution: {
        pupilName: "Meffiu",
        exerciseName: this.props.exercise.name,
        exerciseType: ExerciseTypesEnum.LISTENING,
        answers: []
      },
    };
  }

  handleSubmit(e) {
    // e.preventDefault();
    // this.setState({
    //   exercise: {
    //     question: name,
    //     closedAnswers: [],
    //   },
    // });
    this.props.handleSubmit(this.state.solution);
  }

  render() {
    const { exercise } = this.props;
    return (
      <React.Fragment>
        <Form.Group controlId="formBasicPassword">
        <p className="exerciseListenTitle">{"Exercise " + this.props.exerciseNumber}</p>
        <p className="exerciseListenQuestion">Listen and write</p>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Control type="plaintext" value={this.state.solution.answers[0]}/>
        </Form.Group>
      </React.Fragment>
    );
  }
}

export default ListeningExerciseForm;
