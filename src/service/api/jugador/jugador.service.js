import {baseUrl} from '../../../config/const';
import {handleResponse} from '../../../_helpers/handle-response';
import {authHeader} from "../../../_helpers/auth-header";
import axios from 'axios';

export const jugadorService = {
    count,

};


function count() {
    const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/jugadores/count`,
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