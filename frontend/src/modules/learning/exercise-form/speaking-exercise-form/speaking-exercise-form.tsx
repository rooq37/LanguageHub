import React from "react";
import "./speaking-exercise-form.css";
import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { ExerciseTypesEnum } from "../../../../enums/exercise-types.enum";
import { ISolution } from "../../../../models/solution.model";
import { ISpeakingExercise } from "../../../../models/speaking-exercise.model";

export interface IPropsSpeakingExerciseForm {
  exercise: ISpeakingExercise;
  handleSubmit;
}
export interface IStatesSpeakingExerciseForm {
  solution: ISolution;
}
class SpeakingExerciseForm extends Component<
  IPropsSpeakingExerciseForm,
  IStatesSpeakingExerciseForm
> {
  constructor(props) {
    super(props);
    this.state = {
      solution: {
        pupilName: "Meffiu",
        exerciseName: this.props.exercise.name,
        exerciseType: ExerciseTypesEnum.SPEAKING,
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
        <Form.Group controlId="formBasicPassword">
          
        <p className="exerciseSpeakTitle">Exercise</p>
        <p className="exerciseSpeakQuestion">Click mic button and say: {this.props.exercise.text}</p>
        </Form.Group>
        <Button>Mic</Button>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Control type="plaintext" value={this.state.solution.answers[0]}/>
        </Form.Group> */}
      </React.Fragment>
    );
  }
}

export default SpeakingExerciseForm;
