import { ActionType } from 'typesafe-actions';
import { InfoResponse } from '../../dtos/info-response';
import { ISolution } from '../../models/solution.model';
import * as actions from './actions';

export type SolutionActions = ActionType<typeof actions>;


export interface ISolutionState {
    solution: ISolution,
    infoResponse: InfoResponse
}

export enum ACTION_TYPES {
    CREATE_SOLUTION = 'CREATE_SOLUTION',
    RESET = 'RESET'
}