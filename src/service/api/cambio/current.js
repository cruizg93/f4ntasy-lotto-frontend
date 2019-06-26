import { baseUrl, tokenStr } from '../../../config/const'
export function current() {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/admin/moneda/cambio/current`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${tokenStr}`
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
    });
}