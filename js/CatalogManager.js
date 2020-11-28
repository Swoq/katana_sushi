import {get_data} from "./index.js";

export default class CatalogManager {
    constructor(containerEl){
        this.containerEl = containerEl;
        this.hash = "catalog"
    }

    onLoad(subHash) {
        this.containerEl.innerHTML = this.showLoading();

        if (subHash == null){
            this.loadFullCatalog();
        }
        else {
            this.loadByCategory(subHash);
        }
        return true;
    }

    loadByCategory(categoryUrl){
        get_data().then(data => {
            let categoryId;

            for (let j = 0; j < data.productsCategories.length; j++) {
                if (data.productsCategories[j].url == categoryUrl){
                    categoryId = data.productsCategories[j].categoryId;
                    break;
                }
            }
            console.log(categoryId);

            let i = 0;
            let product_by_category = data.products.filter(function(obj) {
                if (i < data.productsDetail.length){
                    console.log(data.productsDetail[i])
                    return (categoryId == data.productsDetail[i++].categoryId);
                }
                else
                    return false;
            });
            console.log(product_by_category);

            this.containerEl.innerHTML = `
            ${this.sectionTemplate()}

            <div class="container container-products">
                <div class="row">
                    <div class="col-12 col-sm-3">
                        <div class="card bg-light mb-3">
                            <div class="card-header bg-dark text-white text-uppercase"><i class="fa fa-list"></i> Categories</div>
                            <ul class="list-group category_block">
                                ${data.productsCategories.map(this.categoryTemplate).join('')}
                            </ul>
                        </div>
                        ${this.getRecomendation(data.products[0])}
                    </div>
                    <div class="col">
                        <div class="row">
                            ${product_by_category.map(this.productTemplate).join('')}
                        </div>
                    </div>
                </div>
            </div>

            `
        })
    }

    loadFullCatalog(){
        get_data().then(data => {
            this.containerEl.innerHTML = `

            ${this.sectionTemplate()}
            <div class="container container-products">
                <div class="row">
                    <div class="col-12 col-sm-3">
                        <div class="card bg-light mb-3">
                            <div class="card-header bg-dark text-white text-uppercase"><i class="fa fa-list"></i> Categories</div>
                            <ul class="list-group category_block">
                                ${data.productsCategories.map(this.categoryTemplate).join('')}
                            </ul>
                        </div>
                        ${this.getRecomendation(data.products[0])}
                    </div>
                    <div class="col">
                        <div class="row">
                            ${data.products.map(this.productTemplate).join('')}
                        </div>
                    </div>
                </div>
            </div>
            `
        })
    }

    getRecomendation(product){
        return `
        <div class="card bg-light mb-3">
                            <div class="card-header bg-dark text-white text-uppercase">Chief's Recomendation</div>
                            <div class="card-body">
                                <img class="img-fluid" src="${product.images[0]}" />
                                <h5 class="card-title">${product.productName}</h5>
                                <p class="card-text">${product.productDescription}</p>
                                <p class="bloc_left_price">${product.price} $</p>
                            </div>
                        </div>
        `
    }

    getHash(){
        return this.hash;
    }


    productTemplate(product){
        return `
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
    }

    categoryTemplate(category){
        return `
            <li class="list-group-item list-group-item-action list-group-item-secondary"><a href="#catalog/${category.url}">${category.name}</a></li>
        `
    }

    sectionTemplate(){
        return `
        <section class="jumbotron text-center">
                <div class="container">
                    <h1 class="jumbotron-heading">E-COMMERCE CATEGORY</h1>
                    <p class="lead text-muted mb-0">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte...</p>
                </div>
            </section>
        `
    }

    showLoading(){
        return `
        <div class="text-center" style="background-color: white; opacity: 0,5; height: 500px;">
        <div class="spinner-border" style="position: absolute; top: 40%; left: 50%;" role="status">
          <span class="sr-only" >Loading...</span>
        </div>
      </div>
        `;
    }

    attachEventListener(){

    }

}