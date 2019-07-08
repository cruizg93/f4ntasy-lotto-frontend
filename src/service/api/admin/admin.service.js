import {baseUrl} from '../../../config/const';
import {authHeader} from "../../../_helpers/auth-header";
import axios from 'axios';
import {authenticationService} from "../authentication/authentication.service";

export const adminService = {
    count,
    new_player,
    list_players_username: list_players,
    count_player_asistente,
    add_player_asistente,
    list_players_details,

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

function count_player_asistente(data) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${currentUser.accessToken}`
        },
    };

    let send={
        id: data
    }

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