import { ACTION_TYPES, ISolutionState } from './types';
const init: ISolutionState = {
    solution: null,
    infoResponse: null
};

export function exerciseReducer(state: ISolutionState = init, action): ISolutionState {

    if(action.type === ACTION_TYPES.CREATE_SOLUTION){
        return Object.assign({}, state, {
            infoResponse: action.payload.data,
        });
    }
    else if(action.type === ACTION_TYPES.RESET){
        return state = init
    }
    return state;
    
}