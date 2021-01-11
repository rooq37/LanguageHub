import { ACTION_TYPES,  IExerciseState } from './types';
const init: IExerciseState = {
    exercises: [],
    exercise: null,
    infoResponse: null,
    redirect: false
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
    else if(action.type === ACTION_TYPES.CREATE_EXERCISE){
        return Object.assign({}, state, {
            infoResponse: action.payload.data,
            redirect: true
        });
    }
    else if(action.type === ACTION_TYPES.UPDATE_EXERCISE){
        return Object.assign({}, state, {
            infoResponse: action.payload.data,
            redirect: true
        });
    }
    else if(action.type === ACTION_TYPES.DELETE_EXERCISE){
        const deletedExerciseName = new URLSearchParams(action.payload.config.url).get('name');
        return Object.assign({}, state, state.exercises = state.exercises.filter(exercise => exercise.name !== deletedExerciseName), {
            infoResponse: action.payload.data,
        });
    }
    else if(action.type === ACTION_TYPES.ASSIGN_TO_EXERCISE){
        return Object.assign({}, state, {
            infoResponse: action.payload.data,
        });
    }
    else if(action.type === ACTION_TYPES.RESET){
        return state = init
    }
    return state;
    
}