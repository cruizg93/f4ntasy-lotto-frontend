import { baseUrl } from '../../../config/const';
import { authHeader } from "../../../_helpers/auth-header";
import axios from 'axios';
import authenticationService from "../authentication/authentication.service";

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
    get_balance,
    list_historial_apuestas,
    get_historial_apuestas_details_by_id,
    get_historial_apuestas_user_details_by_id,
    delete_apuesta_number,
    list_apuestas_asistente_hoy_by_username,
    list_of_numbers_by_apuesta_id,
    list_historial_weeks,
    weekOverview_jugador,
    apuestasOverview_sorteo,
    delete_apuestas_activas_sorteoAndNumeroAndJugador,
    delete_apuestas_activas_sorteoAndJugador
};

function list_number() {
    const requestOptions = { headers: authHeader() };
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
    const requestOptions = { headers: authHeader() };
    let send = {
        username: currentUser.username
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/apuestas/${id}/numeros/list`,
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


function list_of_numbers_by_apuesta_id(id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = { headers: authHeader() };
    let send = {
        username: currentUser.username
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/apuestas/${id}/numeros/list`,
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
    const requestOptions = { headers: authHeader() };
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
    const requestOptions = { headers: authHeader() };
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
    const requestOptions = { headers: authHeader() };
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
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = { headers: authHeader() };
    let send = {
        username: currentUser.username
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/balance`,
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

function list_apuestas_hoy_by_username() {
    const requestOptions = { headers: authHeader() };
    const currentUser = authenticationService.currentUserValue;

    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/sorteos/activos/jugadores/${currentUser.username}`,
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

function list_apuestas_asistente_hoy_by_username() {
    const requestOptions = { headers: authHeader() };
    const currentUser = authenticationService.currentUserValue;
    let send = {
        username: currentUser.username
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/apuestas/asistente/hoy/list`,
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
    console.log('user', currentUser.username)
    console.log('data', data)
    let send = {
        username: currentUser.username,
        data: data
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/sorteos/activos/${id}/apuestas`,
            send, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 409 || error.response.status === 500) {
                    resolve(error.response)
                }
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

function list_historial_weeks() {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/history/weeks`,
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

function weekOverview_jugador(weekId) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/history/weeks/${weekId}/jugador`,
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

function apuestasOverview_sorteo(id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/history/weeks/jugador/sorteo/${id}`,
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

function list_historial_apuestas() {
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
        axios.post(`${baseUrl}/user/historial`,
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

function get_historial_apuestas_details_by_id(id) {
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
        axios.post(`${baseUrl}/user/historial/apuesta/${id}`,
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

function get_historial_apuestas_user_details_by_id(id) {
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
        axios.post(`${baseUrl}/user/historial/apuesta/${id}/detalles`,
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


//sorteos/activos/{id}/delete/number

function delete_apuesta_number(id, numeroValue, userIdValue) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        userId: userIdValue,
        numero: numeroValue
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/user/sorteos/activos/${id}/delete/number`,
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

//sorteos/activos/{id}/apuestas/{numbero}

function delete_apuestas_activas_sorteoAndNumeroAndJugador(id, numero) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.delete(`${baseUrl}/sorteos/activos/${id}/apuestas/${numero}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 409 || error.response.status === 500) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

//sorteos/activos/{id}/apuestas

function delete_apuestas_activas_sorteoAndJugador(id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.delete(`${baseUrl}/sorteos/activos/${id}/apuestas`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 409 || error.response.status === 500) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}