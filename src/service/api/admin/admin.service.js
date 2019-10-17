import { baseUrl } from '../../../config/const';
import { authHeader } from "../../../_helpers/auth-header";
import axios from 'axios';
import authenticationService from "../authentication/authentication.service";

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
    submit_bono,
    get_historial_weeklist,
    get_historial_apuestas_sorteoAndJugador,
    get_historial_weekOverview,
    get_historial_weekOverviewByJugador,
    get_historial_apuestasOverview_sorteoAndJugador,
    get_historial_apuestasOverview_sorteo,
    get_historial_by_type,
    get_historial_current_week_by_id_and_type,
    get_historial_current_week_by_id_and_type_details,
    get_historial_semana_anterior_by_type,
    get_historial_numeros_ganadores,
    get_numeros_ganadores,
    fix_numero_ganador,
    get_ganancias_perdidas,
    update_numero_ganador,
    get_current_cambio,
    get_asistente_by_id,
    edit_asistente,
    temporal_service,
    temporal_reset_balance_service,
    temporal_insert_service,
    temporal_insert_chica_service,
    cerrar_apuesta,
    details_apuesta_activa_by_apuesta_id,
    open_apuesta,
    admin_password_confirm,
    cerrar_bloquear,
    cerrar_desbloquear,
    delete_apuestas_activas_sorteoAndNumeroAndJugador,
    delete_apuestas_activas_sorteoAndJugador
};


function temporal_service(id) {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/temporal/${id}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function temporal_reset_balance_service() {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/temporal/reset/balance`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function temporal_insert_service() {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/temporal/crear/apuesta`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}
function temporal_insert_chica_service() {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/temporal/crear/apuesta/chica`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}


function count() {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/jugadores/count`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function list_players() {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/jugadores`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    })
}

function list_players_details() {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/jugadores/list`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    })
}

function get_player_by_id(id) {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/jugador/${id}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    })
}

function get_asistente_by_id(id) {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/asistente/${id}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
                if (error.response.status === 409 || error.response.status === 500 || error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function edit_asistente(data) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/asistente/update`,
            data, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/sorteos/activosResumen/judadores/${username}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
    /*let send = {
        username: username
    };*/
    return new Promise((resolve, reject) => {
        /*axios.post(`${baseUrl}/admin/jugador/apuestas/${id}`,
            send, requestOptions*/

        axios.get(`${baseUrl}/sorteos/activos/${id}/apuestas/${username}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

///jugador/apuestas/activas/{id}/detalles
function details_apuesta_activa_by_apuesta_id(username, id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };

    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/sorteos/activos/${id}/apuestas/detalles/${username}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}


function delete_player_by_id(id) {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/jugadores/delete/${id}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    })
}


function get_apuestas_activas(moneda) {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/sorteos/activos/${moneda}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    })
}


function get_apuesta_activa_by_type_and_id(currency, id, isHistory) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    console.log(isHistory);
    let requestUrl = `/sorteos/activos/detalles/${id}/${currency}`;
    if( isHistory){
        requestUrl = `/history/sorteos/${id}/apuestas/riesgo/${currency}`;
    }

    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}${requestUrl}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function submit_bono(id, bono, moneda, weekId) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    let tmp = parseInt(bono);
    let send = {
        bono: tmp,
        moneda: moneda,
        weekId: weekId
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/bono/jugadores/${id}`,
            send, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function get_historial_weeklist() {
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
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function get_historial_apuestas_sorteoAndJugador(sorteosId, userId) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/history/sorteos/${sorteosId}/apuestas/detalles/${userId}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function get_historial_weekOverview(id, historyType, moneda) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/history/weeks/${id}/${historyType}/${moneda}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function get_historial_weekOverviewByJugador(weekId, jugadorId) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/history/weeks/${weekId}/jugador/${jugadorId}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function get_historial_apuestasOverview_sorteoAndJugador(jugadorId, id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/history/weeks/jugador/${jugadorId}/sorteo/${id}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function get_historial_apuestasOverview_sorteo(id, currency) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/history/weeks/jugador/sorteo/${id}/${currency}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function get_historial_numeros_ganadores(moneda) {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/history/numeros/ganadores/${moneda}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    })
}

function get_numeros_ganadores() {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/numeros/ganadores`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    })
}


function fix_numero_ganador(numero, id) {
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
    };
    return new Promise((resolve, reject) => {
        axios.put(`${baseUrl}/sorteos/${id}/numero-ganador`,
            send, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
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
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}


function update_numero_ganador(numero, numeroOld, id) {
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
        axios.post(`${baseUrl}/admin/numeros/ganadores/${id}/update`,
            send, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

///moneda/cambio/current

function get_current_cambio() {
    const requestOptions = { headers: authHeader() };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/admin/moneda/cambio/current`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    })
}

// /admin/apuesta / bloquear / ${ id }
function cerrar_apuesta(id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    const send = {
        id: id
    }
    return new Promise((resolve, reject) => {
        axios.put(`${baseUrl}/sorteos/forceCloseStatus/${id}`,
            send, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function open_apuesta(numero, id, adminPassword) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    const send = {
        numero: numero,
    }
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/sorteos/activos/${id}/numero-ganador`,
            send, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function admin_password_confirm(id, adminPassword) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    const send = {
        password: adminPassword
    }
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/admin/validateAdminPassword`,
            send, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function cerrar_bloquear(id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    const send = {
        id: id
    }
    return new Promise((resolve, reject) => {
        axios.put(`${baseUrl}/sorteos/bloquear/${id}`,
            send, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function cerrar_desbloquear(id) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    const send = {
        id: id
    }
    return new Promise((resolve, reject) => {
        axios.put(`${baseUrl}/sorteos/desbloquear/${id}`,
            send, requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function delete_apuestas_activas_sorteoAndNumeroAndJugador(id, jugadorId, numero) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.delete(`${baseUrl}/sorteos/activos/${id}/jugadores/${jugadorId}/apuestas/${numero}`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 409 || error.response.status === 500 || error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}

function delete_apuestas_activas_sorteoAndJugador(id, jugadorId) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };
    return new Promise((resolve, reject) => {
        axios.delete(`${baseUrl}/sorteos/activos/${id}/jugadores/${jugadorId}/apuestas`,
            requestOptions
        )
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error.response.status === 409 || error.response.status === 500 || error.response.status === 401) {
                    resolve(error.response)
                }
                reject(error);
            })
    });
}