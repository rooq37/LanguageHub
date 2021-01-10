import { IExercise } from "./exercise.model";
import { IClosedAnswer } from "./closed-answer.model";

export interface IClosedQuestionExercise extends IExercise {
    question?: string,
    closedAnswers?: IClosedAnswer[]
} 