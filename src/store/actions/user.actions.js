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
                        firstConnection: response.data.firstConnection
                    }
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                    dispatch({ type: LOGIN_SUCCESS, payload: data });
                    setTimeout(() => {
                        authenticationService.reloadCrrentUserValue();
                        if (response.data.firstConnection === true) {
                            if (response.data.roles[0] === 'ROLE_USER' || response.data.roles[0] === 'ROLE_ASIS') {
                                history.push('/usuario/password/cambiar');
                            } else {
                                history.push('/');
                            }
                        } else {
                            history.push('/');
                        }
                        dispatch({ type: LODING_STATE, payload: false });
                    }, 300);
                } else {

                }
            }).catch(e => {
                dispatch({ type: LOGIN_FAILURE, payload: false });
                dispatch({ type: LODING_STATE, payload: false });
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