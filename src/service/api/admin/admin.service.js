import {baseUrl} from '../../../config/const';
import {authHeader} from "../../../_helpers/auth-header";
import axios from 'axios';
import {authenticationService} from "../authentication/authentication.service";

export const adminService = {
    count,
    new_player,
    edit_player,
    list_players_username: list_players,
    count_player_asistente,
    add_player_asistente,
    list_players_details,
    get_player_by_id,
    list_apuestas_details,
    list_apuestas_activas_details_by_user_id,
    details_apuesta_activa_by_user_id,
    delete_player_by_id,
    get_apuestas_activas,
    get_apuesta_activa_by_type_and_id,
    get_historial_by_type,
    get_historial_current_week_by_id_and_type,
    get_historial_current_week_by_id_and_type_details,
    get_historial_semana_anterior_by_type,
    get_historial_numeros_ganadores,
    get_numeros_ganadores,
    fix_numero_ganador,
    get_ganancias_perdidas,
    update_numero_ganador
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

function new_player(data) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/jugadores/add`,
            data, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

function edit_player(data) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/jugadores/update`,
            data, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

function list_players() {
    const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/jugadores`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

function list_players_details() {
    const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/jugador/list`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

function get_player_by_id(id) {
    const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/jugador/${id}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

function count_player_asistente(data) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };

    let send = {
        id: data
    };

    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/jugador/asistentes/count`,
            JSON.stringify(send), requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

function add_player_asistente(data) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/asistente/add`,
            JSON.stringify(data), requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}

function list_apuestas_details(username) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        username: username
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/jugador/apuestas/hoy/list`,
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

function list_apuestas_activas_details_by_user_id(username, id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        username: username
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/jugador/apuestas/${id}`,
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


function details_apuesta_activa_by_user_id(username, id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        username: username
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/jugador/apuestas/activa/${id}/detalles`,
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

function delete_player_by_id(id) {
    const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/jugadores/delete/${id}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    })
}


function get_apuestas_activas() {
    const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/apuestas/activas`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    })
}


function get_apuesta_activa_by_type_and_id(type, id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        type: type
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/apuestas/activas/${id}`,
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


function get_historial_by_type(type) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        type: type
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/historial/week/current`,
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


function get_historial_current_week_by_id_and_type(id, type) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        type: type
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/historial/week/current/usuario/${id}`,
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

function get_historial_current_week_by_id_and_type_details(id, type, date) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        type: type,
        date: date
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/historial/week/current/usuario/${id}/detail`,
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

function get_historial_semana_anterior_by_type(type) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        type: type
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/historial/week/last`,
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

function get_historial_numeros_ganadores() {
    const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/historial/numeros/ganadores`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

function get_numeros_ganadores() {
    const requestOptions = {headers: authHeader()};
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/numeros/ganadores`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    })
}


function fix_numero_ganador(numero, numeroOld, id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        numero: numero,
        anterior: numeroOld
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/numeros/ganadores/${id}`,
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

function get_ganancias_perdidas(inicio, fin) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        inicio: inicio,
        fin: fin
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/historial/balance`,
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


function update_numero_ganador(numero, id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let send = {
        numero: numero
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/numeros/ganadores/${id}/update`,
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