import React from "react";
import { Component } from "react";
import { ExerciseTypesEnum } from "../../../enums/exercise-types.enum";
import { IExerciseForPupil } from "../../../models/learning/exercise-for-pupil.model";
import ClosedQuestionExerciseForm from "./closed-question-exercise-form/closed-question-exercise-form";
import ListeningExerciseForm from "./listening-exercise-form/listening-exercise-form";
import OpenQuestionExerciseForm from "./open-question-exercise-form/open-question-exercise-form";
import SpeakingExerciseForm from "./speaking-exercise-form/speaking-exercise-form";

export interface ILessonFormProps {
  exercise: IExerciseForPupil;
  handleSubmit;
}
class ExerciseForm extends Component<ILessonFormProps> {
  renderSwitch(exercise: IExerciseForPupil) {
    switch (exercise["@type"]) {
      case ExerciseTypesEnum.CLOSED_QUESTION:
        return (
          <ClosedQuestionExerciseForm handleSubmit={this.props.handleSubmit}  exercise={this.props.exercise} />
        );
      case ExerciseTypesEnum.LISTENING:
        return <ListeningExerciseForm handleSubmit={this.props.handleSubmit}  exercise={this.props.exercise} />;
      case ExerciseTypesEnum.OPEN_QUESTION:
        return <OpenQuestionExerciseForm handleSubmit={this.props.handleSubmit}  exercise={this.props.exercise} />;
      case ExerciseTypesEnum.SPEAKING:
        return <SpeakingExerciseForm handleSubmit={this.props.handleSubmit}  exercise={this.props.exercise} />;
      default:
        return "Error while rendering form for exercise.";
    }
  }

  render() {
    const { exercise } = this.props;
    return this.renderSwitch(exercise);
  }
}

export default ExerciseForm;
