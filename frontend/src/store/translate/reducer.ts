import { ACTION_TYPES,  ITranslateState } from './types';
const init: ITranslateState = {
    translateResponse: {},
    sound: null,
    textToTranslate: ''
};

export function translateReducer(state: ITranslateState = init, action): ITranslateState {

    if(action.type === ACTION_TYPES.TRANSLATE_TEXT){
        return Object.assign({}, state, {
            translateResponse: action.payload.data,
            sound: null
        });
    }else if(action.type === ACTION_TYPES.TRANSLATE_SYNETHESIZE){
        return Object.assign({}, state, {
            sound: action.payload.data
        });
    }else if(action.type === ACTION_TYPES.GET_TEXT_FROM_SOUND){
        return Object.assign({}, state, {
            textToTranslate: action.payload.data
        });
    }
    return state;
}