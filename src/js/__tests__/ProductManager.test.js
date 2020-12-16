jest.mock('../async-util');

import ProductManager from "../ProductManager";

describe("ProductManager class", ()=> {
    let _;
    let contentEl;
    beforeAll(()=>{
        document.body.innerHTML = `<div id="page-content"></div>`
        contentEl = document.getElementById("page-content");
        _ = new ProductManager(contentEl);
    });

    afterEach(()=>{
        _ = new ProductManager(contentEl);
    });

    describe("ProductManager: showLoading", ()=>{
        it("should show loading", ()=>{
            let result =  `
        <div class="text-center" style="background-color: white; opacity: 0.5; height: 500px;">
        <div class="spinner-border" style="position: absolute; top: 40%; left: 50%;" role="status">
          <span class="sr-only" >Loading...</span>
        </div>
      </div>
        `;
            expect(_.showLoading()).toEqual(result);
        });
    });

    describe("ProductManager: getHash", ()=>{
        it("should return hash", ()=>{

            expect(_.getHash()).toEqual('product');
        });
    });

    describe("ProductManager: loadProduct", ()=>{
        let showLoading;

        it("should invoke showLoading", ()=>{
            showLoading = jest.fn();
            ProductManager.prototype.showLoading = function (){
                return showLoading();
            };
        });

        it("should load product", ()=>{
            let product2Show = {
                "url": "pizza_mozzarella1",
                "productName": "Pizza Mozzarella1",
                "productDescription": "About Pizza ... ",
                "price": 155.05,
                "images": ["https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg", "https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg"]
            };

            let result = `
            <div class="container product_detail_container">
            <div class="card">
                <div class="row">
                    <aside class="col-sm-5 border-right">
                        <article class="gallery-wrap">
                            <div class="img-big-wrap">
                                <div class="big_image-wrp"><img src="${product2Show.images[0]}"></div>
                            </div> <!-- slider-product.// -->
                            <div class="img-small-wrap">
                                ${product2Show.images.map(img => {
                return `<div class="item-gallery"><img src="${img}"></div>`
            })}
                            </div> <!-- slider-nav.// -->
                        </article> <!-- gallery-wrap .end// -->
                    </aside>
                    <aside class="col-sm-7">
                        <article class="card-body p-5">
                            <h3 class="title mb-3">${product2Show.productName}</h3>
        
                            <p class="price-detail-wrap">
            <span class="price h3 text-warning">
                <span class="currency">US $</span><span class="num">${product2Show.price}</span>
            </span>
                                <span>/per kg</span>
                            </p> <!-- price-detail-wrap .// -->
                            <dl class="item-property">
                                <dt>Description</dt>
                                <dd><p>${product2Show.productDescription}</p></dd>
                            </dl>
                            <dl class="param param-feature">
                                <dt>Model#</dt>
                                <dd>12345611</dd>
                            </dl>  <!-- item-property-hor .// -->
                            <dl class="param param-feature">
                                <dt>Color</dt>
                                <dd>Black and white</dd>
                            </dl>  <!-- item-property-hor .// -->
                            <dl class="param param-feature">
                                <dt>Delivery</dt>
                                <dd>Russia, USA, and Europe</dd>
                            </dl>  <!-- item-property-hor .// -->
        
                            <hr>
                            <div class="row">
                                <div class="col-sm-5">
                                    <dl class="param param-inline">
                                        <dt>Quantity:</dt>
                                        <dd>
                                            <select class="form-control form-control-sm" style="width:70px;">
                                                <option> 1</option>
                                                <option> 2</option>
                                                <option> 3</option>
                                            </select>
                                        </dd>
                                    </dl>  <!-- item-property .// -->
                                </div> <!-- col.// -->
                                <div class="col-sm-7">
                                    <dl class="param param-inline">
                                        <dt>Size:</dt>
                                        <dd>
                                            <label class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                                       id="inlineRadio1" value="option2">
                                                <span class="form-check-label">SM</span>
                                            </label>
                                            <label class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                                       id="inlineRadio2" value="option2">
                                                <span class="form-check-label">MD</span>
                                            </label>
                                            <label class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                                       id="inlineRadio3" value="option2">
                                                <span class="form-check-label">XXL</span>
                                            </label>
                                        </dd>
                                    </dl>  <!-- item-property .// -->
                                </div> <!-- col.// -->
                            </div> <!-- row.// -->
                            <hr>
                            <a href="#" class="btn btn-lg btn-outline-dark text-uppercase"> Buy now </a>
                            <a href="#" class="btn btn-lg btn-dark text-uppercase"> <i
                                    class="fas fa-shopping-cart"></i> Add to cart </a>
                        </article> <!-- card-body.// -->
                    </aside> <!-- col.// -->
                </div> <!-- row.// -->
            </div> <!-- card.// -->
            `;

            let el = document.createElement("DIV");
            el.innerHTML = result;

            let promise = new Promise(resolve => {
                _.loadProduct('pizza_mozzarella1');
                resolve();
            });
            promise.then(()=>{
                expect(el.innerHTML).toEqual(contentEl.innerHTML);
                expect(showLoading).toHaveBeenCalledTimes(1);
            });



        });
    });

    describe("ProductManager: onLoad", ()=>{
        it("should return false if null", ()=>{
            expect(_.onLoad(null)).toBeFalsy();
        });

        it("should invoke loadProduct if not null", ()=>{
            const loadProduct = jest.fn();
            ProductManager.prototype.loadProduct = function (){
                return loadProduct();
            };

            _.onLoad("test")
            expect(loadProduct).toHaveBeenCalledTimes(1);
        });

        it("should return true if not null", ()=>{
            expect(_.onLoad("test")).toBeTruthy();
        });
    });




});