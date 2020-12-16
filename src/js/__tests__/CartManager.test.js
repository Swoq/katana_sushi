jest.mock('../async-util');

import CartManager from '../CartManager';

describe('CartManager class', ()=> {
    let _;
    beforeAll(()=>{
        _ = new CartManager();
    });

    afterEach(()=>{
        _ = new CartManager();
    });

    it('should have default values after init', ()=>{
        expect(_.amountOfProducts).toBe(0);
        expect(_.total).toBe(0);
        expect(_.status).toBe(false);
    });

    describe('CartManager: turnOnButtons & turnOffButtons', ()=>{
        let checkout_btn;
        let clear_cart_btn;
        beforeAll(()=>{
            checkout_btn = document.createElement('BUTTON');
            clear_cart_btn = document.createElement('BUTTON');

            _.checkout_btn = checkout_btn;
            _.clear_cart_btn = clear_cart_btn;
        });

        it('should add attribute and change status', ()=>{

            _.turnOffButtons();
            expect(_.status).toBeFalsy();
            expect(_.checkout_btn.disabled).toBeTruthy();
        });

        it('should remove attribute and change status', ()=>{
            checkout_btn = document.createElement('BUTTON');
            clear_cart_btn = document.createElement('BUTTON');

            _.checkout_btn = checkout_btn;
            _.clear_cart_btn = clear_cart_btn;

            _.checkout_btn.setAttribute('disabled', '');
            _.clear_cart_btn.setAttribute('disabled', '');

            _.turnOnButtons();
            expect(_.status).toBeTruthy();
            expect(_.checkout_btn.disabled).toBeFalsy();
        });

    });

    describe('CartManager: getCartProductTemplate', ()=>{
        let product;
        let amount;
        beforeAll(()=>{
            product = {
                'url': 'pizza_mozzarella1',
                'productName': 'Pizza Mozzarella1',
                'productDescription': 'About Pizza ... ',
                'price': 155.05,
                'images': ['https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg', 'https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg']
            };
            amount = 1;
        });

        it('should return template from product', ()=>{
            let result = `
            <div class="row cart-detail">
                <div class="col-lg-4 col-sm-4 col-4 cart-detail-img">
                    <img src="${product.images[0]}">
                </div>
                <div class="col-lg-8 col-sm-8 col-8 cart-detail-product">
                    <p>${product.productName}</p>
                    <span class="price text-info"> $${product.price}</span> <span class="count" id="${product.url}">Quantity: ${amount}</span>
                </div>
            </div>
        `;

            expect(_.getCartProductTemplate(product, amount)).toEqual(result);
        });
    });

    describe('CartManager: addNewProductsByHashes', ()=>{
        it('should add products by hash', ()=>{
            let productNumberLabelEl1 = document.createElement('DIV');
            productNumberLabelEl1.setAttribute('id', 'productNumberLabel1');
            let productNumberLabelEl2 = document.createElement('DIV');
            productNumberLabelEl2.setAttribute('id', 'productNumberLabel2');
            let totalEl = document.createElement('DIV');
            totalEl.setAttribute('id', 'total');
            let cartSection = document.createElement('DIV');
            cartSection.setAttribute('id', 'cart-dropdown');

            document.body.append(productNumberLabelEl1, productNumberLabelEl2, totalEl, cartSection);
            let getAmountFromLocalStorage = jest.fn(function (){
                return 1;
            });

            CartManager.prototype.getAmountFromLocalStorage = function (){
                return getAmountFromLocalStorage();
            };

            const turnOnButtons = CartManager.prototype.turnOnButtons = jest.fn();

            let local_storage_items = [{url: 'pizza_mozzarella1', amount: 1}];
            let promise = new Promise((resolve) => {
                _.addNewProductsByHashes(local_storage_items);
                resolve();
            });

            promise.then(()=>{
                expect(_.amountOfProducts).toBe(1);
                expect(turnOnButtons).toHaveBeenCalledTimes(1);
                expect(_.total).toBe(155.05);
            });

        });
    });

    describe('CartManager: getHash', ()=>{
        it('should be defined', ()=>{
            expect(_.getHash()).toBeDefined();
        });

        it('should return hash', ()=>{
            expect(_.getHash()).toBe('cart');
        });
    });

    describe('CartManager: onLoad', ()=>{

        it('should be defined', ()=>{
            expect(_.onLoad(null)).toBeDefined();
        });

        it('should return false if null', ()=>{
            expect(_.onLoad(null)).toBe(false);
        });

        it('should call clearCart() if clear', ()=>{
            const clearCart = CartManager.prototype.clearCart = jest.fn();

            _.onLoad('clear');

            expect(clearCart).toHaveBeenCalledTimes(1);
        });


        describe('addProductToLocalStorage returns values', ()=>{
            let addProductToLocalStorage = jest.fn();
            beforeAll(()=>{
                // CartManager.prototype.addProductToLocalStorage = function (){
                //     return addProductToLocalStorage();
                // }
                CartManager.prototype.clearCart = addProductToLocalStorage;
                addProductToLocalStorage.mockReturnValueOnce(true).mockReturnValueOnce(false);
            });

            it('should call addNewProductsByHashes() if true', ()=>{
                const addNewProductsByHashes = CartManager.prototype.addNewProductsByHashes = jest.fn();
                _.onLoad('test');
                expect(addNewProductsByHashes).toHaveBeenCalledTimes(1);
            });

            it('should call addExistProduct() if false', ()=> {
                const addExistProduct = CartManager.prototype.addExistProduct = jest.fn();
                _.onLoad('test');
                expect(addExistProduct).toHaveBeenCalledTimes(1);
            });
        });

    });



});