import { ACTION_TYPES,  IExerciseState } from './types';
const init: IExerciseState = {
    exercises: [],
    exercise: null
};

export function exerciseReducer(state: IExerciseState = init, action): IExerciseState {

    if(action.type === ACTION_TYPES.GET_ALL_EXERCISES){
        return Object.assign({}, state, {
            exercises: action.payload.data,
        });
    }
    else if(action.type === ACTION_TYPES.GET_EXERCISE){
        return Object.assign({}, state, {
            exercise: action.payload.data,
        });
    }
    
    return state;
    
}