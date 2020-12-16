import {get_data} from '../async-util';

jest.mock('../async-util');

import HomeManager from '../HomeManager';

describe('HomeManager class', ()=> {
    let _;
    let contentEl;
    beforeAll(()=>{
        document.body.innerHTML = '<div id="page-content"></div>';
        contentEl = document.getElementById('page-content');
        _ = new HomeManager(contentEl);
    });

    afterEach(()=>{
        _ = new HomeManager(contentEl);
    });

    describe('HomeManager: showLoading', ()=>{
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

    describe('CatalogManager: getHash', ()=>{
        it('should return hash', ()=>{

            expect(_.getHash()).toEqual('action');
        });
    });

    describe('CatalogManager: actionSlideTemplate', ()=>{
        it('should return action template', ()=>{
            let action = {
                'url': 'promotion_first',
                'name': 'Promotion 1',
                'description': 'Promotion details lorem ipsum.. ',
                'datePosted': '21.02.2020',
                'img': 'https://dummyimage.com/1000x300/000/fff.png&text=Promotion+1'
            };
            let result = `
            <div class="custom-item">
                <img src="${action.img}">
                <div class="caption">
                    <a href="#action/${action.url}"><h2 class="display-5 text-light">${action.name}</h2></a>
                </div>
            </div>
        `;
            expect(_.actionSlideTemplate(action)).toEqual(result);
        });
    });

    describe('HomeManager: mainTitleTemplate', ()=>{
        it('should return main title template', ()=>{
            let result = `
            <section class="jumbotron text-center">
                    <div class="container">
                        <h1 class="jumbotron-heading">KATANA SUSHI</h1>
                        <p class="lead text-muted mb-0">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte...</p>
                    </div>
                </section>
        `;
            expect(_.mainTitleTemplate()).toEqual(result);
        });
    });

    describe('HomeManager: getTitlesBlocks', ()=>{
        it('should return blocks', ()=>{
            let result = `
        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div class="col-md-5 p-lg-5 mx-auto my-5">
          <h1 class="display-4 font-weight-normal">Punny headline</h1>
          <p class="lead font-weight-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple’s marketing pages.</p>
          <a class="btn btn-outline-secondary" href="#">Coming soon</a>
        </div>
        <div class="product-device shadow-sm d-none d-md-block"></div>
        <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>
      
      <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        <div class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
          <div class="my-3 py-3">
            <h2 class="display-5">Another headline</h2>
            <p class="lead">And an even wittier subheading.</p>
          </div>
          <div class="bg-light shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
        </div>
        <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div class="my-3 p-3">
            <h2 class="display-5">Another headline</h2>
            <p class="lead">And an even wittier subheading.</p>
          </div>
          <div class="bg-dark shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
        </div>
      </div>
      
      <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div class="my-3 p-3">
            <h2 class="display-5">Another headline</h2>
            <p class="lead">And an even wittier subheading.</p>
          </div>
          <div class="bg-dark shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
        </div>
        <div class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
          <div class="my-3 py-3">
            <h2 class="display-5">Another headline</h2> 
            <p class="lead">And an even wittier subheading.</p>
          </div>
          <div class="bg-light shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
        </div>
      </div>
      
        `;
            expect(_.getTitlesBlocks()).toEqual(result);
        });
    });

    describe('HomeManager: loadAction', ()=>{
        it('should load action', ()=>{
            const showLoading = jest.fn(()=>{
                return ' ';
            });
            HomeManager.prototype.showLoading = function (){
                return showLoading();
            };
            let action2Show = {
                'url': 'promotion_first',
                'name': 'Promotion 1',
                'description': 'Promotion details lorem ipsum.. ',
                'datePosted': '21.02.2020',
                'img': 'https://dummyimage.com/1000x300/000/fff.png&text=Promotion+1'
            };
            let result = `
            <div class="container">
              <h1 class="my-4">${action2Show.name}
                <small>${action2Show.datePosted}</small>
              </h1>
            
              <div class="row">
                <div class="col-md-8">
                  <img class="img-fluid rounded" src="${action2Show.img}" alt="">
                </div>
                <div class="col-md-4">
                  <h3 class="my-3">Project Description</h3>
                  <p>${action2Show.description}</p>
                  <h3 class="my-3">Project Details</h3>
                  <ul>
                    <li>Lorem Ipsum</li>
                    <li>Dolor Sit Amet</li>
                    <li>Consectetur</li>
                    <li>Adipiscing Elit</li>
                  </ul>
                </div>
              </div>
            </div>
            `;

            let el = document.createElement('DIV');
            el.innerHTML = result;

            let promise = new Promise(resolve => {
                _.loadAction(action2Show.url);
                resolve();
            });
            promise.then(()=>{
                expect(el.innerHTML).toEqual(contentEl.innerHTML);
                expect(showLoading).toHaveBeenCalledTimes(1);
            });

        });

    });

    describe('HomeManager: onLoad', ()=>{
        it('should return false if null', ()=>{
            expect(_.onLoad(null)).toBeFalsy();
        });

        it('should invoke loadAction if not null', ()=>{
            const loadAction = HomeManager.prototype.loadAction = jest.fn();
            _.onLoad('test');
            expect(loadAction).toHaveBeenCalledTimes(1);
        });

        it('should return true if not null', ()=>{
            expect(_.onLoad('test')).toBeTruthy();
        });
    });

    describe('HomeManager: attachSliderLogic', ()=>{
        beforeAll(()=>{
            document.body.innerHTML =
                `<div class="custom-slider-items">
                    <div class="active">slide1</div>
                    <div>slide2</div>
                </div>
                <div class="right-slide"></div>
                <div class="left-slide"></div>`;
        });

        it('should be defined', ()=>{
            _.attachSliderLogic();
            expect(_.attachSliderLogic).toBeDefined();
        });

    });

    describe('HomeManager: loadMainPage', ()=>{
        it('should load main page', ()=>{
            get_data().then(data => {
                let result = `

            ${_.mainTitleTemplate()}
            
            <div class="custom-slider">
                <div class="custom-slider-items">
                    <div class="custom-item active">
                        <img src="${data.actions[0].img}">
                        <div class="caption">
                            <a href="#action/${data.actions[0].url}"><h2 class="display-5 text-light">${data.actions[0].name}</h2></a>
                        </div>
                    </div>
                    ${data.actions.slice(1).map(_.actionSlideTemplate).join('')}
                </div>

                <div class="right-slide">&#62;</div>
                <div class="left-slide">&#60;</div>
            </div>

            <div>
                ${_.getTitlesBlocks()}
            </div>
            `;
                let t_element = document.createElement('DIV');
                t_element.innerHTML = result;
                const attachSliderLogic = HomeManager.prototype.attachSliderLogic = jest.fn();

                let promise = new Promise(resolve => {
                    _ = new HomeManager(contentEl);
                    _.loadMainPage();
                    resolve();
                });
                promise.then(()=>{
                    expect(attachSliderLogic).toHaveBeenCalledTimes(1);
                    expect(contentEl.innerHTML).toEqual(t_element.innerHTML);
                });

            });
        });


    });

});