import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LODING_STATE
} from './types';

import { userService } from './user.service';
import { history } from '../history';
import { API } from '../../config/const';
import authenticationService from '../../service/api/authentication/authentication.service';

export const userActions = {
    login,
    logout,
    loading_start,
    loading_end
};

function loading_start() {
    return dispatch => {
        dispatch({ type: LODING_STATE, payload: true });
    }
}

function loading_end() {
    return dispatch => {
        dispatch({ type: LODING_STATE, payload: false });
    }
}

function login(action, history) {
    action.username = action.username[0].toUpperCase() + action.username.slice(1);
    return dispatch => {
        let apiEndPoint = API.LOGIN;
        dispatch({ type: LODING_STATE, payload: true });
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
                        dispatch({ type: LODING_STATE, payload: false });
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