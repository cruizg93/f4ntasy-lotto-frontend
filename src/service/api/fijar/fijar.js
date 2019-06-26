import { baseUrl, tokenStr } from '../../../config/const';
export function list_numeros() {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/admin/numeros/fijados`, {
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

export function update_number(updateNumber){
     return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/admin/numeros/fijados/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${tokenStr}`
            },
            body: JSON.stringify(updateNumber)
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