import {baseUrl, tokenStr} from '../../../config/const';
import {authHeader} from "../../../_helpers/auth-header";
import {authenticationService} from "../authentication/authentication.service";
import axios from 'axios';

export function list() {
    const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/users`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export function update_password(updatePassword) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json',  "Authorization": `Bearer ${currentUser.accessToken}`},
    };
    return new Promise((resolve, reject) => {

        axios.post(`${baseUrl}/admin/user/password/update`,
           updatePassword, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}