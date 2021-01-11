import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { translateReducer } from './translate/reducer';
import { exerciseReducer } from './exercise/reducer';
import { ITranslateState } from './translate/types';
import thunk from "redux-thunk";
import { IExerciseState } from './exercise/types';
import { ILearningState } from './learning/types';
import { learningReducer } from './learning/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar'

export interface IRootState {
    translate: ITranslateState,
    exercise: IExerciseState,
    learning: ILearningState
}

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
  translate:translateReducer,
  exercise:exerciseReducer,
  learning:learningReducer,
  loadingBar: loadingBarReducer
}), storeEnhancers(applyMiddleware(thunk)));

export default store;