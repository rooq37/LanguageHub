import { ACTION_TYPES } from './types';
import axios from 'axios';
import { InfoResponse } from '../../dtos/info-response';
import { IExercise } from '../../models/exercise.model';
import { AssignationsRequest } from '../../dtos/assignations-request';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function getAllExercises(author: String) {
  return function(dispatch){
    dispatch(showLoading())
    return axios.get(`http://localhost:8080/api/exercises?author=` + author)
    .then(json => {
      dispatch({type: ACTION_TYPES.GET_ALL_EXERCISES, payload: json});
      dispatch(hideLoading());
    })
  };
}

export function getExercise(name: String, author: String){
  return function(dispatch){
    dispatch(showLoading())
    return axios.get(`http://localhost:8080/api/exercises?author=` + author + `&name=` + name)
    .then(json => {
      dispatch({type: ACTION_TYPES.GET_EXERCISE, payload: json});
      dispatch(hideLoading());
    })
  };
}


export function createExercise(exercise: IExercise) {
  return function(dispatch){
    dispatch(showLoading())
    return axios.post<InfoResponse>(`http://localhost:8080/api/exercises`,  exercise )
    .then(json => {
      dispatch({type: ACTION_TYPES.CREATE_EXERCISE, payload: json});
      dispatch(hideLoading());
    }).catch(error => {
      dispatch({type: ACTION_TYPES.CREATE_EXERCISE, payload: error.response});
      dispatch(hideLoading());
  })
  };
}

export function updateExercise(exercise: IExercise) {
  return function(dispatch){
    dispatch(showLoading())
    return axios.put<InfoResponse>(`http://localhost:8080/api/exercises`,  exercise )
    .then(json => {
      dispatch({type: ACTION_TYPES.UPDATE_EXERCISE, payload: json});
      dispatch(hideLoading());
    }).catch(error => {
      dispatch({type: ACTION_TYPES.UPDATE_EXERCISE, payload: error.response});
      dispatch(hideLoading());
  })
  };
}

export function deleteExercise(name: string, author: string) {
  return function(dispatch){
    dispatch(showLoading())
    return axios.delete(`http://localhost:8080/api/exercises?author=` + author + `&name=` + name)
    .then(json => {
      dispatch({type: ACTION_TYPES.DELETE_EXERCISE, payload: json});
      dispatch(hideLoading());
    }).catch(error => {
      dispatch({type: ACTION_TYPES.DELETE_EXERCISE, payload: error.response});
      dispatch(hideLoading());
  }) 
  };
}

export function assignToExercise(name: string, author: string, pupilsNames:string[]) {
  const body : AssignationsRequest =  {
    tutorName: author,
    exerciseName: name,
    pupilsToAssign: pupilsNames
  }
  return function(dispatch){
    dispatch(showLoading())
    return axios.put(`http://localhost:8080/api/pupil/assignations`, body)
    .then(json => {
      dispatch({type: ACTION_TYPES.ASSIGN_TO_EXERCISE, payload: json});
      dispatch(hideLoading());
    }).catch(error => {
      dispatch({type: ACTION_TYPES.ASSIGN_TO_EXERCISE, payload: error.response});
      dispatch(hideLoading());
  }) 
  };
}

export function reset() {
  return {type: ACTION_TYPES.RESET};
}
