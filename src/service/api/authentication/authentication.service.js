import { BehaviorSubject } from 'rxjs';

import { baseUrl } from '../../../config/const';
import { handleResponse } from '../../../_helpers/handle-response';

var currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

function login(username, password) {
    let user = username[0].toUpperCase() + username.slice(1);
    username = user;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${baseUrl}/api/auth/signin`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    return new Promise((resolve, reject) => {
        localStorage.removeItem('currentUser');
        currentUserSubject.next(null);
        window.location.reload(true);
    });
}

function type_user() {
    if (currentUserSubject.value !== null) {
        let roles = currentUserSubject.value.roles;
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
}

export default {
    login,
    logout,
    type_user,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    },
    reloadCrrentUserValue() {
        currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    }
};
