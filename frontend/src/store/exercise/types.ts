import { ActionType } from 'typesafe-actions';
import { InfoResponse } from '../../dtos/info-response';
import { IExercise } from '../../models/exercise.model';
import * as actions from './actions';
export type ExerciseActions = ActionType<typeof actions>;

export interface IExerciseState {
    exercises: IExercise[],
    exercise: IExercise,
    infoResponse: InfoResponse,
    redirect: boolean
}

export enum ACTION_TYPES {
    GET_ALL_EXERCISES = 'GET_ALL_EXERCISES',
    GET_EXERCISE = 'GET_EXERCISE',
    CREATE_EXERCISE = 'CREATE_EXERCISE',
    UPDATE_EXERCISE = 'UPDATE_EXERCISE',
    DELETE_EXERCISE = 'DELETE_EXERCISE',
    ASSIGN_TO_EXERCISE = 'ASSIGN_TO_EXERCISE',
    RESET = 'RESET'
}