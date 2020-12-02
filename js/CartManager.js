import {get_data} from "./index.js";

export default class CartManager {
    constructor(shoppingCartEl){
        this.shoppingCartEl = shoppingCartEl;
        this.hash = "cart"
        this.amountOfProducts = 0;
        this.total = 0;
        this.status = false;

        
        this.checkout_btn = document.getElementById("checkout_btn");
        this.clear_cart_btn = document.getElementById("clear_cart_btn");
    }

    getHash(){
        return this.hash;
    }

    onLoad(subHash) {
        if (subHash == null){
            history.pushState(null, null, '/');
            return false;
        }
        else {
            
            if(subHash == 'clear'){
                history.pushState(null, null, '/#catalog');
                this.clearCart();
            }
            else if(this.addProductToLocalStorage(subHash)){
                history.pushState(null, null, '/#catalog');
                this.addNewProductsByHashes([{url : subHash, amount : 1}]);
            }
            else {
                history.pushState(null, null, '/#catalog');
                this.addExistProduct(subHash);
            }
        }

        return true;
    }

    turnOnButtons(){
        this.status = true;
        this.checkout_btn.removeAttribute('disabled');
        this.clear_cart_btn.removeAttribute('disabled');
    }

    turnOffButtons(){
        this.status = false;
        this.checkout_btn.setAttribute('disabled');
        this.clear_cart_btn.setAttribute('disabled');
    }

    addNewProductsByHashes(subHashes){
        get_data().then(data => {
            let urls = [];
            subHashes.forEach(element => {
                urls.push(element.url);
            });

            let product2AddList = data.products.filter(product => {
                return urls.includes(product.url);
            });
            
            let productNumberLabelEl1 = document.getElementById("productNumberLabel1");
            let productNumberLabelEl2 = document.getElementById("productNumberLabel2");
            let totalEl = document.getElementById("total");
            let cartSection = document.getElementById("cart-dropdown");

            product2AddList.forEach(product => {
                // Increase label
                let product_amount = this.getAmountFromLocalStorage(product.url);
                this.amountOfProducts += product_amount;
                productNumberLabelEl1.innerText = this.amountOfProducts;
                productNumberLabelEl2.innerText = this.amountOfProducts;

                // Increase Total
                this.total += (product.price * product_amount);
                totalEl.innerText = ("$ " + this.total.toFixed(2));

                // Show Product
                let amount = subHashes.filter(element => {
                    return product.url === element.url;
                })[0].amount;
                cartSection.innerHTML += this.getCartProductTemplate(product, amount);
            });

            if (!this.status && this.amountOfProducts > 0)
                this.turnOnButtons();
        });
    }

    addExistProduct(subHash){

        get_data().then(data => {
            let product2AddList = data.products.filter(product => {
                return subHash === product.url
            });
            
            let productNumberLabelEl1 = document.getElementById("productNumberLabel1");
            let productNumberLabelEl2 = document.getElementById("productNumberLabel2");
            let totalEl = document.getElementById("total");

            product2AddList.forEach(product => {
                // Increase label
                this.amountOfProducts ++;
                productNumberLabelEl1.innerText = this.amountOfProducts;
                productNumberLabelEl2.innerText = this.amountOfProducts;

                // Increase Total
                this.total += product.price;
                totalEl.innerText = ("$ " + this.total.toFixed(2));

                let countEl = document.getElementById(subHash);
                let amount = this.getAmountFromLocalStorage(subHash);
                countEl.innerText = ("Quantity: " + amount);

            });
        })
    }

    getCartProductTemplate(product, amount){
        return `
            <div class="row cart-detail">
                <div class="col-lg-4 col-sm-4 col-4 cart-detail-img">
                    <img src="${product.images[0]}">
                </div>
                <div class="col-lg-8 col-sm-8 col-8 cart-detail-product">
                    <p>${product.productName}</p>
                    <span class="price text-info"> $${product.price}</span> <span class="count" id="${product.url}">Quantity: ${amount}</span>
                </div>
            </div>
        `
    }

    loadCartFromLocalStorage(){
        let cart_list = JSON.parse(localStorage.getItem("cart"));

        
        let productNumberLabelEl1 = document.getElementById("productNumberLabel1");
        let productNumberLabelEl2 = document.getElementById("productNumberLabel2");
        let totalEl = document.getElementById("total");
        let cartSection = document.getElementById("cart-dropdown");

        cartSection.innerHTML = "";
        totalEl.innerText = "$ 0";
        productNumberLabelEl1.innerText = 0;
        productNumberLabelEl2.innerText = 0;

        this.total = 0;
        this.amountOfProducts = 0;

        this.addNewProductsByHashes(cart_list);
        
        if (this.status == true && this.amountOfProducts == 0)
            this.turnOffButtons();
    }

    addProductToLocalStorage(productUrl){
        let cart_list = JSON.parse(localStorage.getItem("cart"));

        if(!cart_list){
            cart_list = [];
            cart_list.push({url: productUrl, amount: 1})
            this.updateLocalStorageCart(cart_list);
            return true;
        }

        let exist = false;
        for (let i = 0; i < cart_list.length; i++) {
            const element = cart_list[i];
            if (element.url === productUrl){
                element.amount++;
                exist = true;
                break
            }
        }
        if (!exist){
            cart_list.push({url: productUrl, amount: 1});
            this.updateLocalStorageCart(cart_list);
            return true;
        }
        this.updateLocalStorageCart(cart_list);
        return false;
    }

    getAmountFromLocalStorage(url){
        let cart_list = JSON.parse(localStorage.getItem("cart"));

        for (let i = 0; i < cart_list.length; i++) {
            const element = cart_list[i];
            if (element.url === url){
                return element.amount;
            }
        }
    }

    updateLocalStorageCart(newCart){
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    clearCart(){
        localStorage.setItem("cart", JSON.stringify([]));
        this.loadCartFromLocalStorage();
    }
    
}