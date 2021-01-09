import React from "react";
import { Component } from "react";
import { ExerciseTypesEnum } from "../../../enums/exercise-types.enum";
import { IExercise } from "../../../models/exercise.model";
import ClosedQuestionExerciseForm from "./closed-question-exercise-form/closed-question-exercise-form";
import ListeningExerciseForm from "./listening-exercise-form/listening-exercise-form";
import OpenQuestionExerciseForm from "./open-question-exercise-form/open-question-exercise-form";
import SpeakingExerciseForm from "./speaking-exercise-form/speaking-exercise-form";

export interface IExerciseFormProps {
  exerciseType: ExerciseTypesEnum;
  handleSubmit;
  exercise?: IExercise;
}
class ExerciseForm extends Component<IExerciseFormProps> {
  renderSwitch() {
    const { exerciseType, handleSubmit, exercise } = this.props;
    switch (exerciseType) {
      case ExerciseTypesEnum.CLOSED_QUESTION:
        return (
          <ClosedQuestionExerciseForm
            handleSubmit={handleSubmit}
            exercise={exercise}
          />
        );
      case ExerciseTypesEnum.LISTENING:
        return (
          <ListeningExerciseForm
            handleSubmit={handleSubmit}
            exercise={exercise}
          />
        );
      case ExerciseTypesEnum.OPEN_QUESTION:
        return (
          <OpenQuestionExerciseForm
            handleSubmit={handleSubmit}
            exercise={exercise}
          />
        );
      case ExerciseTypesEnum.SPEAKING:
        return (
          <SpeakingExerciseForm
            handleSubmit={handleSubmit}
            exercise={exercise}
          />
        );
      default:
        return "Error while rendering form for exercise.";
    }
  }

  render() {
    return this.renderSwitch();
  }
}

export default ExerciseForm;
