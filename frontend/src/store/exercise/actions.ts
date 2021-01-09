import { ACTION_TYPES } from './types';
import axios from 'axios';

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

