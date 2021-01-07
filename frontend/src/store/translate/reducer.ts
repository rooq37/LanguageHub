import { ACTION_TYPES,  ITranslateState } from './types';
const init: ITranslateState = {
    translateResponse: {},
    sound: ""
};

export function translateReducer(state: ITranslateState = init, action): ITranslateState {

    if(action.type === ACTION_TYPES.TRANSLATE_TEXT){
        return Object.assign({}, state, {
            translateResponse: action.payload.data
        });
    }else if(action.type === ACTION_TYPES.TRANSLATE_SYNETHESIZE){
        return Object.assign({}, state, {
            sound: action.payload.data
        });
    }
    return state;
}