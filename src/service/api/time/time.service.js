import {baseUrl} from '../../../config/const';
import axios from 'axios';

export const timeService ={
    time
}


function time() {   
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',           
        },
    };
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/utils/time`,
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