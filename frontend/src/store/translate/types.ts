import { ActionType } from 'typesafe-actions';
import { TranslateResponse } from '../../dtos/translate-response';
import * as actions from './actions';
export type TranslateActions = ActionType<typeof actions>;

export interface ITranslateState {
    translateResponse: TranslateResponse,
    sound: File,
    textToTranslate: string
}

export enum ACTION_TYPES {
    TRANSLATE_TEXT = 'TRANSLATE_TEXT',
    TRANSLATE_SYNETHESIZE = 'TRANSLATE_SYNETHESIZE',
    GET_TEXT_FROM_SOUND = 'GET_TEXT_FROM_SOUND',
    RESET = 'RESET'
}