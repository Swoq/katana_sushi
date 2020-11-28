import {get_data} from "./index.js"

export default class ProductManager {
    constructor(contantEl){
        this.contentEl = contantEl;
        this.hash = "product";
    }

    onLoad(subHash){
        if (subHash == null){
            return false;
        }
        else {
            this.loadProduct(subHash);
        }
        return true;
    }

    loadProduct(subHash){
        this.contentEl.innerHTML = this.showLoading();
        
        get_data().then(data => {
            let product2ShowList = data.products.filter(product => {
                return product.url === subHash;
            });
            let product2Show = product2ShowList[0];

            this.contentEl.innerHTML = `
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
            `

        })
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

    getHash(){
        return this.hash;
    }

}