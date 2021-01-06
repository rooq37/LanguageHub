import { ACTION_TYPES,  ITranslateState } from './types';
const init: ITranslateState = {
    translateResponse: {},
};

export function translateReducer(state: ITranslateState = init, action): ITranslateState {

    if(action.type === ACTION_TYPES.TRANSLATE_TEXT){
        return Object.assign({}, state, {
            translateResponse: action.payload.data
        });
    }

    return state;
}