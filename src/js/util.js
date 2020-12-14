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

export function init_end_points(){
    return new Promise((resolve, reject) => {
        get_data().then(data => {
            let products_end_poins = [];
            let actions_end_poins = [];
            let categories_end_poins = [];
            let orders_end_poins = [];

            data.products.forEach(element => {
                products_end_poins.push(element.url)
            });

            products_end_poins.push("clear");

            data.productsCategories.forEach(element => {
                categories_end_poins.push(element.url)
            });

            data.actions.forEach(element =>{
                actions_end_poins.push(element.url)
            });

            data.orders.forEach(element =>{
                orders_end_poins.push(element)
            });

            resolve({products_end_poins, actions_end_poins, categories_end_poins, orders_end_poins});
        })
    })
}