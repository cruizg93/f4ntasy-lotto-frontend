import {baseUrl} from '../../../config/const';
import {handleResponse} from '../../../_helpers/handle-response';
import {authHeader} from "../../../_helpers/auth-header";
import axios from 'axios';
import {authenticationService} from "../authentication/authentication.service";

export const playerService={
    list_number
}

function list_number() {
const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/user/apuestas/numeros`,
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