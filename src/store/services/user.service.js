import axios from 'axios';
export const userService = {
    get,
    post,
    put,
    deleteDetail
};
function get(apiEndpoint) {
    return axios.get(apiEndpoint).then((response) => {
        return response;
    }).catch((err) => {
        console.log('err', err);
    })
}

function post(apiEndpoint, payload) {
    return axios.post(apiEndpoint, payload).then((response) => {
        return response;
    }).catch((err) => {
        console.log('err', err);
    })
}
function put(apiEndpoint, payload) {
    return axios.put(apiEndpoint, payload).then((response) => {
        return response;
    }).catch((err) => {
        console.log('err', err);
    })
}
function deleteDetail(apiEndpoint) {
    return axios.delete(apiEndpoint).then((response) => {
        return response;
    }).catch((err) => {
        console.log('err', err);
    })
}