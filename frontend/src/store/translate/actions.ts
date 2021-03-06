import { ACTION_TYPES } from './types';
import axios from 'axios';
import { TranslateResponse } from '../../dtos/translate-response';
import { TranslateRequest } from '../../dtos/translate-request';
import { LanguageCodesEnum } from '../../enums/language-codes.enum';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function translateText(from: LanguageCodesEnum, to: LanguageCodesEnum, text: string) {
  const body : TranslateRequest =  {
    sourceLanguageCode: from,
    targetLanguageCode: to,
    text: text
  }
  return function(dispatch){
    dispatch(showLoading())
    return axios.post<TranslateResponse>(`http://localhost:8080/api/translate/text`,  body )
    .then(json => {
      dispatch({type: ACTION_TYPES.TRANSLATE_TEXT, payload: json});
      dispatch(hideLoading());
    })
  };
}

export function translateSynethesize(text: String, language: LanguageCodesEnum) {
  return function(dispatch){
    dispatch(showLoading())
    return axios.get(`http://localhost:8080/api/translate/synthesize/` + text + `?language=` + language)
    .then(json => {
      dispatch({type: ACTION_TYPES.TRANSLATE_SYNETHESIZE, payload: json});
      dispatch(hideLoading());
    })
  };
}

export function getTextFromSound(sound: File){
  const formData = new FormData();
  formData.append('sound',sound);
  return function(dispatch){
    dispatch(showLoading('longTask'))
    return axios.post(`http://localhost:8080/api/translate/sound`,  formData )
    .then(json => {
      dispatch({type: ACTION_TYPES.GET_TEXT_FROM_SOUND, payload: json});
      dispatch(hideLoading('longTask'));
    })
  };
  
}

export function reset() {
  return {type: ACTION_TYPES.RESET};
}