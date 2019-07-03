import {baseUrl} from '../../../config/const';
import {authHeader} from "../../../_helpers/auth-header";
import axios from 'axios';
import {authenticationService} from "../authentication/authentication.service";

export const playerService={
    list_number,
    list_apuestas_hoy,
    update_number,
    list_apuestas_activas_details,
    update_number_apuesta_activas
};

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

function list_apuestas_hoy() {
const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/user/apuestas/hoy`,
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

function update_number(data, id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send={
        username: currentUser.username,
        data: data
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/apuestas/${id}/numeros/update`,
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


function list_apuestas_activas_details(id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send={
        username: currentUser.username
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/apuestas/activas/${id}`,
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



function update_number_apuesta_activas(data, id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send={
        username: currentUser.username,
        data: data
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/apuestas/activas/${id}/update`,
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