import { ActionType } from 'typesafe-actions';
import { InfoResponse } from '../../dtos/info-response';
import { IExerciseForPupil } from '../../models/learning/exercise-for-pupil.model';
import { ISolution } from '../../models/learning/solution.model';
import * as actions from './actions';

export type SolutionActions = ActionType<typeof actions>;


export interface ILearningState {
    exercises: IExerciseForPupil[],
    solution: ISolution,
    infoResponse: InfoResponse
}

export enum ACTION_TYPES {
    CREATE_SOLUTION = 'CREATE_SOLUTION',
    GET_PUPIL_EXERCISES = 'GET_PUPIL_EXERCISES',
    RESET = 'RESET'
}