import axios from 'axios';
export const userService = {
    get,
    post,
    put,
    deleteDetail,
    type_user
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

function type_user(username) {
    if (username !== null) {
        let init_letter = username.charAt(0);
        let role = 'Player';
        switch (init_letter) {
            case 'C':
                role = 'Admin';
                if (username === 'C01') {
                    role = 'Master'
                }
                break;
            case 'P':
                if (username.includes('x')) {
                    role = 'Asistente'
                }
                break;
            default:
                break;
        }
        return role;
    }
}