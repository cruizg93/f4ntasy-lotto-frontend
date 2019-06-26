import {baseUrl} from '../../../config/const';
import {authHeader} from "../../../_helpers/auth-header";
import {authenticationService} from "../authentication/authentication.service";

export function list_numeros() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/admin/numeros/fijados`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export function update_number(updateNumber) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
        body: JSON.stringify(updateNumber)
    };
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/admin/numeros/fijados/add`,
            requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}