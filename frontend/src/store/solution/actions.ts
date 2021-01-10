import { ACTION_TYPES } from './types';
import axios from 'axios';
import { InfoResponse } from '../../dtos/info-response';
import { ISolution } from '../../models/solution.model';

export function createSolution(exercise: ISolution) {
  return function(dispatch){
    return axios.post<InfoResponse>(`http://localhost:8080/api/exercises`,  exercise )
    .then(json => {
      dispatch({type: ACTION_TYPES.CREATE_SOLUTION, payload: json});
    }).catch(error => {
      dispatch({type: ACTION_TYPES.CREATE_SOLUTION, payload: error.response});
  })
  };
}

export function reset() {
  return {type: ACTION_TYPES.RESET};
}
