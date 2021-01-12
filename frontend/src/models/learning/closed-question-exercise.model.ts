import { IExerciseForPupil } from "./exercise-for-pupil.model";

export interface IClosedQuestionExerciseForPupil extends IExerciseForPupil {
    question?: string,
    answers?: string[]
} 