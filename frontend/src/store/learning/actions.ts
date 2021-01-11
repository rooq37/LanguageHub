import { ACTION_TYPES } from './types';
import axios from 'axios';
import { InfoResponse } from '../../dtos/info-response';
import { ISolution } from '../../models/learning/solution.model';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function createSolution(solution: ISolution) {
  return function(dispatch){
    dispatch(showLoading())
    return axios.post<InfoResponse>(`http://localhost:8080/api/learning`,  solution )
    .then(json => {
      dispatch({type: ACTION_TYPES.CREATE_SOLUTION, payload: json});
      dispatch(hideLoading());
    }).catch(error => {
      dispatch({type: ACTION_TYPES.CREATE_SOLUTION, payload: error.response});
      dispatch(hideLoading());
  })
  };
}

export function getPupilExercises(pupilName: string) {
  return function(dispatch){
    dispatch(showLoading())
    return axios.get(`http://localhost:8080/api/learning?pupilName=` + pupilName)
    .then(json => {
      dispatch({type: ACTION_TYPES.GET_PUPIL_EXERCISES, payload: json});
      dispatch(hideLoading());
    })
  };
}

export function reset() {
  return {type: ACTION_TYPES.RESET};
}
