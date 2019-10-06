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
        let value = currentUserSubject.value.username;
        let init_letter = value.charAt(0);
        let role = 'Player';
        switch (init_letter) {
            case 'C':
                role = 'Admin';
                if (value === 'C01') {
                    role = 'Master'
                }
                break;
            case 'P':
                if (value.includes('x')) {
                    role = 'Asistente'
                }
                break;
            default:
                break;
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
