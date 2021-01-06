import { ACTION_TYPES } from './types';
import axios from 'axios';
import { TranslateResponse } from '../../dtos/translate-response';
import { TranslateRequest } from '../../dtos/translate-request';


export function translateText(from, to, text) {
  const body : TranslateRequest =  {
    sourceLanguageCode: from,
    targetLanguageCode: to,
    text: text
  }
  return function(dispatch){
    return axios.post<TranslateResponse>(`http://localhost:8080/api/translate/text`,  body )
    .then(json => {
      dispatch({type: ACTION_TYPES.TRANSLATE_TEXT, payload: json});
    })
  };
}