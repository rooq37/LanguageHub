import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { translateReducer } from './translate/reducer';
import { ITranslateState } from './translate/types';
import thunk from "redux-thunk";

export interface IRootState {
    translate: ITranslateState
}

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({translate:translateReducer}), storeEnhancers(applyMiddleware(thunk)));

export default store;