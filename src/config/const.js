export const baseUrl = window.location.host == 'localhost:3000' ? 'https://fant4sylotto.herokuapp.com' : '/backend';

export const API = {
  LOGIN: baseUrl + '/api/auth/signin',
  LOGOUT: baseUrl + '/api/auth/logout',
  TIME: baseUrl + '/utils/time',
}

window.logoutURL = API.LOGOUT;

let jsonData = JSON.parse(sessionStorage.getItem('userData'));
export let tokenStr = jsonData === null ? '' : jsonData['accessToken'];
export let userStr = jsonData === null ? '' : jsonData['username'];

