import {get_data} from "./async-util";

export default function init_end_points(){
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

