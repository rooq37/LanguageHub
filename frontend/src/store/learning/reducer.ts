import { ACTION_TYPES, ILearningState as ILearningState } from './types';
const init: ILearningState = {
    exercises: [],
    solution: null,
    infoResponse: null
};

export function learningReducer(state: ILearningState = init, action): ILearningState {

    if(action.type === ACTION_TYPES.CREATE_SOLUTION){
        return Object.assign({}, state, {
            infoResponse: action.payload.data,
        });
    }
    else if(action.type === ACTION_TYPES.GET_PUPIL_EXERCISES){
        return Object.assign({}, state, {
            exercises: action.payload.data,
        });
    }
    else if(action.type === ACTION_TYPES.RESET){
        return state = init
    }
    return state;
    
}