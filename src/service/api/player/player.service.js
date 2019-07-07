import {baseUrl} from '../../../config/const';
import {authHeader} from "../../../_helpers/auth-header";
import axios from 'axios';
import {authenticationService} from "../authentication/authentication.service";

export const playerService = {
    list_number,
    list_number_by_apuesta_id,
    list_apuestas_hoy,
    update_number,
    list_apuestas_activas_details,
    update_number_apuesta_activas,
    list_apuestas_hoy_by_username,
    detalles_by_apuesta_id,
    comision_directo,
    get_balance
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

function list_number_by_apuesta_id(id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {headers: authHeader()};
    let send = {
        username: currentUser.username
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/apuestas/${id}/numeros`,
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


function comision_directo(type) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {headers: authHeader()};
    let send = {
        username: currentUser.username,
        type: type
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/jugador/comision`,
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

function detalles_by_apuesta_id(id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {headers: authHeader()};
    let send = {
        username: currentUser.username
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/apuestas/activa/${id}/detalles`,
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

function get_balance() {
    const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/user/balance`,
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

function list_apuestas_hoy_by_username() {
    const requestOptions = {headers: authHeader()};
    const currentUser = authenticationService.currentUserValue;
    let send = {
        username: currentUser.username
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/apuestas/hoy/list`,
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

function update_number(data, id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
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
    let send = {
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
    let send = {
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