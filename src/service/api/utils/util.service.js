import { baseUrl } from '../../../config/const';
import { authHeader } from "../../../_helpers/auth-header";
import axios from 'axios';
import authenticationService from "../authentication/authentication.service";

export const utilService = {
    firstConnection: first_connection,
    isFirstConnection,
    connectionFirst
}


function first_connection(passcode) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = { headers: authHeader() };
    let send = {
        username: currentUser.username,
        password: passcode
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/utils/password/update`,
            send, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

function isFirstConnection() {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = { headers: authHeader() };
    let send = {
        username: currentUser.username
    };

    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/utils/connection/first`,
            send, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

function connectionFirst() {
    this.isFirstConnection().then((result) => {
        return result;
    })
}

