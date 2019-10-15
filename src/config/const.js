export const baseUrl = 'http://localhost:8080';// : 'https://fant4sylotto.herokuapp.com';

export const API = {
  LOGIN: baseUrl + '/api/auth/signin',
  LOGOUT: baseUrl + '/api/auth/logout',
  TIME: baseUrl + '/utils/time',
}

window.logoutURL = API.LOGOUT;

let jsonData = JSON.parse(sessionStorage.getItem('userData'));
export let tokenStr = jsonData === null ? '' : jsonData['accessToken'];
export let userStr = jsonData === null ? '' : jsonData['username'];

