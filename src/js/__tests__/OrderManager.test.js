jest.mock('../async-util');

import OrderManager from '../OrderManager';

describe('OrderManager class', ()=>{
    let _;
    let contentEl;
    beforeAll(()=>{
        document.body.innerHTML = '<div id="page-content"></div>';
        contentEl = document.getElementById('page-content');
        _ = new OrderManager(contentEl);
    });
    describe('CatalogManager: showLoading', ()=>{
        it('should show loading', ()=>{
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

    describe('OrderManager: getHash', ()=>{
        it('should return hash', ()=>{
            expect(_.getHash()).toEqual('order');
        });
    });

    describe('OrderManager: showError', ()=>{
        it('should return error block', ()=>{
            let result = `
        <div class="alert alert-danger" role="alert">
        Some problems with the data server. Back to <a href="/#" class="alert-link">main page</a>. Give it a click if you like.
        </div>
        `;
            let t_elm = document.createElement('DIV');
            t_elm.innerHTML = result;
            _.showError();
            expect(t_elm.innerHTML).toEqual(contentEl.innerHTML);
        });
    });

    describe('OrderManager: loadOrderById', ()=>{
        it('should return order block', ()=>{
            let id = 1;
            let order_data = {
                address: 'Kiev',
                date: '2020-12-16',
                firstName: 'f',
                lastName: 'f',
                phone: '044-322-12-12',
                time: '18:37'
            };
            let result = `
        <div class="container">
        <article class="card">
        <header class="card-header"> My Order / Tracking </header>
        <div class="card-body">
            <h6>Order ID: ${id}</h6>
            <article class="card">
                <div class="card-body row">
                    <div class="col"> <strong>First name:</strong> <br>${order_data.firstName}</div>
                    <div class="col"> <strong>Last name:</strong> <br> ${order_data.lastName}</div>
                    <div class="col"> <strong>Status:</strong> <br> Picked by the courier </div>
                    <div class="col"> <strong>Delivery address:</strong> <br> ${order_data.address} </div>
                    <div class="col"> <strong>Phone Number:</strong> <br> ${order_data.phone} </div>
                    <div class="col"> <strong>Delivery date:</strong> <br> ${order_data.date} </div>
                    <div class="col"> <strong>Delivery time:</strong> <br> ${order_data.time} </div>
                </div>
            </article>
            <div class="track">
                <div class="step active"> <span class="icon"> <i class="fa fa-check"></i> </span> <span class="text">Order confirmed</span> </div>
                <div class="step"> <span class="icon"> <i class="fa fa-user"></i> </span> <span class="text"> Picked by courier</span> </div>
                <div class="step"> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> On the way </span> </div>
                <div class="step"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">Ready for pickup</span> </div>
            </div>
            <hr>
            <a href="#catalog" class="btn btn-dark" data-abc="true"> <i class="fa fa-chevron-left"></i> Back to catalog</a>
        </div>
    </article>
</div>

        `;

            let el = document.createElement('DIV');
            el.innerHTML = result;

            _.loadOrderById(id, order_data);
            expect(el.innerHTML).toEqual(contentEl.innerHTML);
        });
    });

    describe('OrderManager: attachEventLister', ()=>{
        it('should return order block', ()=>{
            const showLoading = jest.fn();
            OrderManager.prototype.showLoading = function (){
                return showLoading();
            };
            expect(_.attachEventLister).toBeDefined();
        });
    });

    describe('OrderManager: loadCheckout', ()=>{
        it('should load checkout form', ()=>{
            let result = `
<div class="container">
    <div class="py-5 text-center">
      <img class="d-block mx-auto mb-4" src="https://www.flaticon.com/svg/static/icons/svg/129/129300.svg" alt="" width="100" height="100">
      <h2>Checkout form</h2>
      <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group
        has a validation state that can be triggered by attempting to submit the form without completing it.</p>
    </div>

    <div class="row">
      <div class="col-md-12 order-md-1">
        <h4 class="mb-3">Billing address</h4>
        <form class="needs-validation" onsubmit="return false" novalidate>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="email">Email <span class="text-muted">(Optional)</span></label>
            <input type="email" class="form-control" id="email" placeholder="you@example.com">
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

            
          <div class="mb-3">
            <label for="phone">Phone <span class="text-muted">(ex. 044-342-30-19)</span></label>
            <input type="tel" class="form-control" id="phone" placeholder="044-537-14-28" pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" required>
            <div class="invalid-feedback">
                Please enter a valid phone number.
            </div>
          </div>

          <div class="mb-3">
            <label for="address">Address</label>
            <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
            <div class="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="date">Delivery Date (DD)</label>
              <input type="date" class="form-control" id="date" placeholder="" value="" min="" required>
              <div class="invalid-feedback">
                Valid date is required. Sorry we cannot use our time machine for now, but our engineers are working on that. Set the date not earlier than today's date.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="time">Delivery Time (DT)</label>
              <input type="time" class="form-control" id="time" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid time is required. Not earlier than now.
              </div>
            </div>
          </div>

          <hr class="mb-4">
        
          <h4 class="mb-3">Payment</h4>

          <div class="d-block my-3">

            <div class="custom-control custom-radio">
              <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
              <label class="custom-control-label" for="credit">Credit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
              <label class="custom-control-label" for="debit">Upon receipt</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required>
              <label class="custom-control-label" for="paypal">PayPal</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="cc-name">Name on card</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" required>
              <small class="text-muted">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="cc-number">Credit card number</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" required>
              <div class="invalid-feedback">
                Credit card number is required
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="cc-expiration">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
              <div class="invalid-feedback">
                Expiration date required
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="cc-cvv">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
              <div class="invalid-feedback">
                Security code required
              </div>
            </div>
          </div>
          <hr class="mb-4">
          <button class="btn btn-dark btn-lg btn-block" type="submit" id="checkout-submit">Continue to checkout</button>
        </form>
      </div>
    </div>
        `;
            let t_elm = document.createElement('DIV');
            t_elm.innerHTML = result;

            const attachEventLister = OrderManager.prototype.attachEventLister = jest.fn();
            const dateDefaultValidation = OrderManager.prototype.dateDefaultValidation = jest.fn();

            _.loadCheckout();

            expect(t_elm.innerHTML).toEqual(contentEl.innerHTML);
            expect(attachEventLister).toHaveBeenCalledTimes(1);
            expect(dateDefaultValidation).toHaveBeenCalledTimes(1);
        });
    });

    describe('OrderManager: onLoad', ()=>{

        it('should call loadCheckout if null', ()=>{
            const loadCheckout = OrderManager.prototype.loadCheckout = jest.fn();
            _.onLoad(null);
            expect(loadCheckout).toHaveBeenCalledTimes(1);
        });

        it('should return false if not null', ()=>{

            expect(_.onLoad('test')).toBeFalsy();
        });

        it('should return true if null', ()=>{
            expect(_.onLoad(null)).toBeTruthy();
        });


    });
});