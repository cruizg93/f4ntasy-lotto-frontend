import { baseUrl, tokenStr } from '../../../config/const';
export function list() {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/admin/users`, {
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

export function update_password(updatePassword){
     return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/admin/user/password/update`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${tokenStr}`
            },
            body: JSON.stringify(updatePassword)
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