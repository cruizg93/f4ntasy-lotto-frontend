import {baseUrl} from '../../../config/const';
import {authHeader} from "../../../_helpers/auth-header";
import axios from 'axios';
import {authenticationService} from "../authentication/authentication.service";

const utilService ={
    firstConnection: first_connection
}


function first_connection(passcode) {
    const currentUser = authenticationService.currentUserValue;
    const requestOptions = {headers: authHeader()};
    let send = {
        username: currentUser.username, 
        password: passcode
    };
    return new Promise((resolve, reject) => {
        axios.post(`${baseUrl}/utils/connection/first`,
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

