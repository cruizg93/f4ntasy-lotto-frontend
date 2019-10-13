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

function type_user(roles) {
    let role ="";
    for(var i=0; i<roles.length; i++){
        if(roles[i] == "ROLE_MASTER"){
            role = 'Master'
            break;
        }else{
            if(roles[i] == "ROLE_ADMIN"){
                role = 'Admin';
            }else if(roles[i] == "ROLE_SUPERVISOR"){
                role = "Supervisor";
                break;
            }else if(roles[i] == "ROLE_USER"){
                role = 'Player';
            }else if(roles[i] == "ROLE_ASIS"){
                role = 'Asistente'
            }
        }
    }
    return role;
}