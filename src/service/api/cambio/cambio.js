import { baseUrl } from '../../../config/const'
import { authHeader } from "../../../_helpers/auth-header";
import authenticationService from "../authentication/authentication.service";

export function current() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/admin/moneda/cambio/current`,
            requestOptions
        )
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

export function update(updatedValue) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', "Authorization": `Bearer ${currentUser.accessToken}` },
        body: JSON.stringify(updatedValue)
    };
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/admin/moneda/cambio/update`,
            requestOptions
        )
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}