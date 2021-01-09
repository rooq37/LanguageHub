import { ACTION_TYPES } from './types';
import axios from 'axios';
import { InfoResponse } from '../../dtos/info-response';
import { IExercise } from '../../models/exercise.model';

export function getAllExercises(author: String) {
  return function(dispatch){
    return axios.get(`http://localhost:8080/api/exercises?author=` + author)
    .then(json => {
      dispatch({type: ACTION_TYPES.GET_ALL_EXERCISES, payload: json});
    })
  };
}

export function getExercise(name: String, author: String){
  return function(dispatch){
    return axios.get(`http://localhost:8080/api/exercises?author=` + author + `&name=` + name)
    .then(json => {
      dispatch({type: ACTION_TYPES.GET_EXERCISE, payload: json});
    })
  };
}


export function createExercise(exercise: IExercise) {
  return function(dispatch){
    return axios.post<InfoResponse>(`http://localhost:8080/api/exercises`,  exercise )
    .then(json => {
      dispatch({type: ACTION_TYPES.CREATE_EXERCISE, payload: json});
    }).catch(error => {
      dispatch({type: ACTION_TYPES.CREATE_EXERCISE, payload: error.response});
  })
  };
}

