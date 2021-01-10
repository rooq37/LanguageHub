import { IExercise } from "./exercise.model";

export interface IOpenQuestionExercise extends IExercise {
    question?: string,
    acceptableOpenAnswers?: string[]
} 