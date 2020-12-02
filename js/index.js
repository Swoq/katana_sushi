import CartManager from "./CartManager.js";
import CatalogManager from "./CatalogManager.js";
import HomeManager from "./HomeManager.js";
import MainManager from "./MainManager.js";
import OrderManager from "./OrderManager.js";
import ProductManager from "./ProductManager.js";
import RoutManager from "./RoutManager.js";

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
    })
}

function init_end_points(){
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
let contentEl = document.getElementById("page-content");
let shopCartEl = document.getElementById("shop_cart");

let orderManager = new OrderManager(contentEl);
let cartManager = new CartManager(shopCartEl);
let productManager = new ProductManager(contentEl);
let catalogManager = new CatalogManager(contentEl);
let homeManager = new HomeManager(contentEl);

let mainManager = new MainManager(
    [catalogManager, homeManager, productManager, cartManager, orderManager], homeManager);

(function () {
    init_end_points().then(data => {
        new RoutManager(data, mainManager);
        mainManager.loadMainPage();
        mainManager.loadCart();
    })

})();

