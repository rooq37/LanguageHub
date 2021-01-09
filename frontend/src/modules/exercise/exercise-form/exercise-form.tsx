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
  exercise: IExercise;
}
class ExerciseForm extends Component<IExerciseFormProps> {
  renderSwitch(exerciseType, exercise) {
    switch (exerciseType) {
      case ExerciseTypesEnum.CLOSED_QUESTION:
        return <ClosedQuestionExerciseForm exercise={exercise} />;
      case ExerciseTypesEnum.LISTENING:
        return <ListeningExerciseForm />;
      case ExerciseTypesEnum.OPEN_QUESTION:
        return <OpenQuestionExerciseForm />;
      case ExerciseTypesEnum.SPEAKING:
        return <SpeakingExerciseForm />;
      default:
        return "Error while rendering form for exercise.";
    }
  }

  render() {
    const { exerciseType, exercise } = this.props;
    return this.renderSwitch(exerciseType, exercise);
  }
}

export default ExerciseForm;
