import { IExercise } from "./exercise.model";
import { IClosedAnswer } from "./closed-answer.model";

export interface IClosedQuestionExerciseModel extends IExercise {
    question?: string,
    closedAnswers?: IClosedAnswer[]
} 