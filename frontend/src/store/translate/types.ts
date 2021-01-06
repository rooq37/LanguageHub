import { ActionType } from 'typesafe-actions';
import { TranslateResponse } from '../../dtos/translate-response';
import * as actions from './actions';
export type TranslateActions = ActionType<typeof actions>;

export interface ITranslateState {
    translateResponse: TranslateResponse
}

export enum ACTION_TYPES {
    TRANSLATE_TEXT = 'TRANSLATE_TEXT',
}