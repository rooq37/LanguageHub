import React from "react";
import "./open-question-exercise-form.css";
import { Component } from "react";
import { Form } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../../../enums/exercise-types.enum";
import { ISolution } from "../../../../models/solution.model";
import { IOpenQuestionExercise } from "../../../../models/open-question-exercise.model";

export interface IPropsOpenQuestionExerciseForm {
  exerciseNumber: Number;
  exercise: IOpenQuestionExercise;
  handleSubmit;
}
export interface IStatesOpenQuestionExerciseForm {
  solution: ISolution;
}
class OpenQuestionExerciseForm extends Component<
  IPropsOpenQuestionExerciseForm,
  IStatesOpenQuestionExerciseForm
> {
  constructor(props) {
    super(props);
    this.state = {
      solution: {
        pupilName: "Meffiu",
        exerciseName: this.props.exercise.name,
        exerciseType: ExerciseTypesEnum.OPEN_QUESTION,
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
    return (
      <React.Fragment>
        <Form.Group controlId="formOpenExerciseQuestion">
          <p className="exerciseOpenTitle">{"Exercise " + this.props.exerciseNumber}</p>
          <p className="exerciseOpenQuestion">{this.props.exercise.question}</p>
        </Form.Group>
        <Form.Group controlId="formOpenExerciseAnswer">
          <Form.Control type="plaintext" value={this.state.solution.answers[0]}/>
        </Form.Group>
      </React.Fragment>
    );
  }
}

export default OpenQuestionExerciseForm;
