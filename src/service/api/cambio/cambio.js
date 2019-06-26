import { baseUrl } from '../../../config/const'
export function current(tokenStr) {
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

export function update(updatedValue, tokenStr) {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/admin/moneda/cambio/update`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${tokenStr}`
            },
            body: JSON.stringify(updatedValue)
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