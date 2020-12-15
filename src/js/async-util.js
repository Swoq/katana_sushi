export const requestURL = 'https://my-json-server.typicode.com/Swoq/katana_sushi/db';

export function sendRequest(method, url, body=null) {
    return fetch(url, {method: method, body: body}).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json()
    })
        .catch(error => {
            console.log(error);
        });
}

export function get_data(){
    return new Promise ((resolve, reject) => {
        sendRequest('GET', requestURL)
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.log(error);
            });
    })
}