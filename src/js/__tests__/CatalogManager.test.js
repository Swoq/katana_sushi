import {get_data} from "../async-util";

jest.mock('../async-util');

import CatalogManager from "../CatalogManager";

describe("CatalogManager class", ()=> {
    let _;
    let contentEl;
    beforeAll(()=>{
        document.body.innerHTML = `<div id="page-content"></div>`
        contentEl = document.getElementById("page-content");
        _ = new CatalogManager(contentEl);
    });

    afterEach(()=>{
        _ = new CatalogManager(contentEl);
    });

    describe("CatalogManager: showLoading", ()=>{
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

    describe("CatalogManager: youMayLikeTemplate", ()=>{
        it("should return you may like section", ()=>{
            let result = `
        <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2 class="h2_title">Trending <b>Products</b></h2>
                <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="0">
                    <!-- Carousel indicators -->
                    <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    <!-- Wrapper for carousel items -->
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Apple iPad</h4>
                                            <p class="item-price"><strike>$400.00</strike> <span>$369.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Sony Headphone</h4>
                                            <p class="item-price"><strike>$25.00</strike> <span>$23.99</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Macbook Air</h4>
                                            <p class="item-price"><strike>$899.00</strike> <span>$649.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Nikon DSLR</h4>
                                            <p class="item-price"><strike>$315.00</strike> <span>$250.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Sony Play Station</h4>
                                            <p class="item-price"><strike>$289.00</strike> <span>$269.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Macbook Pro</h4>
                                            <p class="item-price"><strike>$1099.00</strike> <span>$869.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-half-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Bose Speaker</h4>
                                            <p class="item-price"><strike>$109.00</strike> <span>$99.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Samsung Galaxy S8</h4>
                                            <p class="item-price"><strike>$599.00</strike> <span>$569.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Apple iPhone</h4>
                                            <p class="item-price"><strike>$369.00</strike> <span>$349.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Canon DSLR</h4>
                                            <p class="item-price"><strike>$315.00</strike> <span>$250.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Google Pixel</h4>
                                            <p class="item-price"><strike>$450.00</strike> <span>$418.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <div class="thumb-wrapper">
                                        <div class="img-box">
                                            <img src="https://dummyimage.com/450x450/000/fff.png" class="img-fluid" alt="">
                                        </div>
                                        <div class="thumb-content">
                                            <h4>Apple Watch</h4>
                                            <p class="item-price"><strike>$350.00</strike> <span>$330.00</span></p>
                                            <div class="star-rating">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                                    <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-primary">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Carousel controls -->
                    <a class="carousel-control-prev" href="#myCarousel" data-slide="prev">
                        <i class="fa fa-angle-left"></i>
                    </a>
                    <a class="carousel-control-next" href="#myCarousel" data-slide="next">
                        <i class="fa fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
        `;
            expect(_.youMayLikeTemplate()).toEqual(result);
        });
    });

    describe("CatalogManager: sectionTemplate", ()=>{
        it("should return section template", ()=>{
            let result = `
        <section class="jumbotron text-center">
                <div class="container">
                    <h1 class="jumbotron-heading">E-COMMERCE CATEGORY</h1>
                    <p class="lead text-muted mb-0">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte...</p>
                </div>
        </section>
        ${_.youMayLikeTemplate()}
        `
            expect(_.sectionTemplate()).toEqual(result);
        });
    });

    describe("CatalogManager: categoryTemplate", ()=>{
        it("should return category template", ()=>{
            let category = {
                "categoryId": 0,
                "url": "vegeterian",
                "name": "Вегетарианские",
                "description": "More details ... "
            };
            let result = `
            <li class="list-group-item list-group-item-action list-group-item-secondary"><a href="#catalog/${category.url}">${category.name}</a></li>
        `;
            expect(_.categoryTemplate(category)).toEqual(result);
        });
    });

    describe("CatalogManager: productTemplate", ()=>{
        it("should return product template", ()=>{
            let product = {
                "url": "pizza_mozzarella1",
                "productName": "Pizza Mozzarella1",
                "productDescription": "About Pizza ... ",
                "price": 155.05,
                "images": ["https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg", "https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg"]
            };
            let result = `
            <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
                <img class="card-img-top" src="${product.images[0]}" alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title text-dark"><a href="#product/${product.url}" class="text-dark" title="View Product">${product.productName}</a></h4>
                    <p class="card-text">${product.productDescription}</p>
                    <div class="row">
                        <div class="col">
                            <p class="btn btn-dark btn-block">${product.price} $</p>
                        </div>
                        <div class="col">
                            <a href="#cart/${product.url}" class="btn btn-outline-dark btn-block">Add to cart</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
            expect(_.productTemplate(product)).toEqual(result);
        });
    });

    describe("CatalogManager: getHash", ()=>{
        it("should return hash", ()=>{

            expect(_.getHash()).toEqual('catalog');
        });
    });

    describe("CatalogManager: getRecomendation", ()=>{
        it("should return recomendation", ()=>{
            let product = {
                "url": "pizza_mozzarella1",
                "productName": "Pizza Mozzarella1",
                "productDescription": "About Pizza ... ",
                "price": 155.05,
                "images": ["https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg", "https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg"]
            };
            let result = `
        <div class="card bg-light mb-3">
                            <div class="card-header bg-dark text-white text-uppercase">Chief's Recomendation</div>
                            <div class="card-body">
                                <img class="img-fluid" src="${product.images[0]}" alt="f"/>
                                <h5 class="card-title">${product.productName}</h5>
                                <p class="card-text">${product.productDescription}</p>
                                <p class="bloc_left_price">${product.price} $</p>
                            </div>
                        </div>
        `
            expect(_.getRecomendation(product)).toEqual(result);
        });
    });

    describe("CatalogManager: loadFullCatalog", ()=>{
        it("should load full catalog", ()=>{
            let promise = new Promise((resolve => {
                _.loadFullCatalog();
                resolve();
            }));
            promise.then(()=>{
                get_data().then(data => {
                    let result = `

            ${_.sectionTemplate()}
            <div class="container container-products">
                <div class="row">
                    <div class="col-12 col-sm-3">
                        <div class="card bg-light mb-3">
                            <div class="card-header bg-dark text-white text-uppercase"><i class="fa fa-list"></i> Categories</div>
                            <ul class="list-group category_block">
                                ${data.productsCategories.map(_.categoryTemplate).join('')}
                            </ul>
                        </div>
                        ${getRecomendation(data.products[0])}
                    </div>
                    <div class="col">
                        <div class="row">
                            ${data.products.map(_.productTemplate).join('')}
                        </div>
                    </div>
                </div>
            </div>
            `;
                    expect(contentEl.innerHTML).toEqual(result);
                })

            });

            function getRecomendation(product){
                return `
        <div class="card bg-light mb-3">
                            <div class="card-header bg-dark text-white text-uppercase">Chief's Recomendation</div>
                            <div class="card-body">
                                <img class="img-fluid" src="${product.images[0]}" alt="f">
                                <h5 class="card-title">${product.productName}</h5>
                                <p class="card-text">${product.productDescription}</p>
                                <p class="bloc_left_price">${product.price} $</p>
                            </div>
                        </div>
        `
            }

        });


    });

    describe("CatalogManager: loadByCategory", ()=>{
        it("should load by category", ()=>{
            let category = 'vegeterian';
            let function_result;
            let promise = new Promise((resolve => {
                function_result = _.loadByCategory(category);
                resolve(function_result);
            }));
            promise.then((data)=>{
                get_data().then(data => {
                    let product_by_category = [{url: "pizza_mozzarella1", productName: "Pizza Mozzarella1", productDescription: "About Pizza ... ", price: 155.05, images: ["https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg",
                            "https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg"]},
                        {url: "pizza_four_cheese1", productName: "Pizza 1", productDescription: "About Pizza ... ", price: 155.05, images: ["https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg",
                                "https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg"]}
                    ];
                    let result = `
            ${_.sectionTemplate()}

            <div class="container container-products">
                <div class="row">
                    <div class="col-12 col-sm-3">
                        <div class="card bg-light mb-3">
                            <div class="card-header bg-dark text-white text-uppercase"><i class="fa fa-list"></i> Categories</div>
                            <ul class="list-group category_block">
                                ${data.productsCategories.map(_.categoryTemplate).join('')}
                            </ul>
                        </div>
                        ${getRecomendation(data.products[0])}
                    </div>
                    <div class="col">
                        <div class="row">
                            ${product_by_category.map(_.productTemplate).join('')}
                        </div>
                    </div>
                </div>
            </div>

            `;
                    expect(contentEl.innerHTML).toEqual(result);
                    expect(data).toBeTruthy();
                })

            });

            function getRecomendation(product){
                return `
        <div class="card bg-light mb-3">
                            <div class="card-header bg-dark text-white text-uppercase">Chief's Recomendation</div>
                            <div class="card-body">
                                <img class="img-fluid" src="${product.images[0]}" alt="f">
                                <h5 class="card-title">${product.productName}</h5>
                                <p class="card-text">${product.productDescription}</p>
                                <p class="bloc_left_price">${product.price} $</p>
                            </div>
                        </div>
        `
            }

        });
    });

    describe("CatalogManager: onLoad", ()=>{

        it("should call loadFullCatalog if null", ()=>{
            const loadFullCatalog = CatalogManager.prototype.loadFullCatalog = jest.fn();
            _.onLoad(null);
            expect(loadFullCatalog).toHaveBeenCalledTimes(1);
        });

        it("should call loadByCategory if not null", ()=>{
            const loadByCategory = CatalogManager.prototype.loadByCategory = jest.fn();
            _.onLoad('test');
            expect(loadByCategory).toHaveBeenCalledTimes(1);
        });

        it("should return true", ()=>{
            expect(_.onLoad()).toBeTruthy();
        });


    });


});