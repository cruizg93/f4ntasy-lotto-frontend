export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://version43.softwaresolutions.co.cr:8080';


let jsonData = JSON.parse(sessionStorage.getItem('userData'));
export let tokenStr = jsonData === null ? '' : jsonData['accessToken'];
export let userStr = jsonData === null ? '' : jsonData['username'];

