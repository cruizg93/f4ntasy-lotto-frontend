# export const baseUrl = 'https://fant4sylotto.herokuapp.com'; //process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://fant4sylotto.herokuapp.com';
export const baseUrl = 'https://apuntada.net/backend';

export const API = {
  LOGIN: baseUrl + '/api/auth/signin',
  LOGOUT: baseUrl + '/api/auth/logout',
  TIME: baseUrl + '/utils/time',
}

window.logoutURL = API.LOGOUT;

let jsonData = JSON.parse(sessionStorage.getItem('userData'));
export let tokenStr = jsonData === null ? '' : jsonData['accessToken'];
export let userStr = jsonData === null ? '' : jsonData['username'];

