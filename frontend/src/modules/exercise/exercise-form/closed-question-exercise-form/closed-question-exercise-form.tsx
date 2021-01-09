import React from "react";
import { Component } from "react";
import { IExercise } from "../../../../models/exercise.model";

export interface IPropsClosedQuestionExerciseForm {
  exercise: IExercise;
}
class ClosedQuestionExerciseForm extends Component<IPropsClosedQuestionExerciseForm> {
  render() {
    return <p>ClosedQuestionExerciseForm</p>;
  }
}

export default ClosedQuestionExerciseForm;
