import { ActionType } from 'typesafe-actions';
import { IExercise } from '../../models/exercise.model';
import * as actions from './actions';
export type ExerciseActions = ActionType<typeof actions>;

export interface IExerciseState {
    exercises: IExercise[],
    exercise: IExercise
}

export enum ACTION_TYPES {
    GET_ALL_EXERCISES = 'GET_ALL_EXERCISES',
    GET_EXERCISE = 'GET_EXERCISE',
}