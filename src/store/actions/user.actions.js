import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './types';

import { userService } from './user.service';
import { history } from '../history';
import { API } from '../../config/const';
import authenticationService from '../../service/api/authentication/authentication.service';

export const userActions = {
    login,
    logout,
};

function login(action, history) {
    action.username = action.username[0].toUpperCase() + action.username.slice(1);
    return dispatch => {
        let apiEndPoint = API.LOGIN;
        userService.post(apiEndPoint, action)
            .then(response => {
                if (response.status === 200) {
                    let data = {
                        currentUser: response.data,
                        username: response.data.username,
                    }
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                    dispatch({ type: LOGIN_SUCCESS, payload: data });
                    setTimeout(() => {
                        authenticationService.reloadCrrentUserValue();
                        history.push('/');
                    }, 300);
                    // NotificationManager.success('Account Created Successfully!');
                } else {

                }
            }).catch(e => {
                // showMessage(e.message);
            });
    }
}

function logout() {
    return dispatch => {
        let apiEndpoint = API.LOGOUT;
        userService.get(apiEndpoint)
            .then(response => {
                history.push('/');
            }).catch(error => {

            });
    }
}