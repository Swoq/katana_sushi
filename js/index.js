const requestURL = 'https://my-json-server.typicode.com/Swoq/katana_sushi/db';

function sendRequest(method, url, body=null){
    return fetch(url).then(response => {
        return response.json()
    })
}

(function () {
    sendRequest('GET', requestURL)
        .then(data => console.log(data))
        .catch(err => console.log(err))
})();