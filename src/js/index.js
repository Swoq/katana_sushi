import init_end_points from './util';

import CartManager from './CartManager.js';
import CatalogManager from './CatalogManager.js';
import HomeManager from './HomeManager.js';
import MainManager from './MainManager.js';
import OrderManager from './OrderManager.js';
import ProductManager from './ProductManager.js';
import RoutManager from './RoutManager.js';

import '../css/catalog.css';
import '../css/order.css';
import '../css/product_detail.css';
import '../css/product.css';
import '../css/slider.css';

let contentEl = document.getElementById('page-content');

let orderManager = new OrderManager(contentEl);
let cartManager = new CartManager();
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
    }).catch(error => {
        console.log(error);
    });

})();

