import {get_data} from "./util";

export default class HomeManager {
    constructor(contantEl){
        this.contentEl = contantEl;
        this.hash = "action"
        this.loadCounter = 0;
    }

    onLoad(subHash){
        if (subHash == null){
            history.pushState(null, null, '/');
            return false;
        }
        else {
            this.loadAction(subHash);
        }
        return true;
        
    }

    showLoading(){
        return `
        <div class="text-center" style="background-color: white; opacity: 0.5; height: 500px;">
        <div class="spinner-border" style="position: absolute; top: 40%; left: 50%;" role="status">
          <span class="sr-only" >Loading...</span>
        </div>
      </div>
        `;
    }

    loadAction(subHash){
        this.contentEl.innerHTML = this.showLoading();

        get_data().then(data => {
            let action2ShowList = data.actions.filter(action => {
                return action.url === subHash;
            });
            let action2Show = action2ShowList[0];
            this.contentEl.innerHTML = `
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
            `
        })
        .catch(error => {
            console.log(error);
        });
    }

    loadMainPage(){
        let contentEl = document.getElementById("page-content");
        
        get_data().then(data => {
            contentEl.innerHTML = `

            ${this.mainTitleTemplate()}
            
            <div class="custom-slider">
                <div class="custom-slider-items">
                    <div class="custom-item active">
                        <img src="${data.actions[0].img}">
                        <div class="caption">
                            <a href="#action/${data.actions[0].url}"><h2 class="display-5 text-light">${data.actions[0].name}</h2></a>
                        </div>
                    </div>
                    ${data.actions.slice(1).map(this.actionSlideTemplate).join('')}
                </div>

                <div class="right-slide">&#62;</div>
                <div class="left-slide">&#60;</div>
            </div>

            <div>
                ${this.getTitlesBlocks()}
            </div>
            `;

            this.attachSliderLogic();
        })
        .catch(error => {
            console.log(error);
        });

        
    }

    getTitlesBlocks(){
        return `
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
    }

    attachSliderLogic(){
        let slides=document.querySelector('.custom-slider-items').children;
        let nextSlide=document.querySelector(".right-slide");
        let prevSlide=document.querySelector(".left-slide");
        let totalSlides=slides.length;
        let index=0;

        nextSlide.onclick=function () {
            next("next");
        }
        prevSlide.onclick=function () {
            next("prev");
        }

        function next(direction){

        if(direction=="next"){
            index++;
            if(index==totalSlides){
                index=0;
            }
        } 
        else{
                if(index==0){
                    index=totalSlides-1;
                }
                else{
                    index--;
                }
            }

        for(let i=0;i<slides.length;i++){
                slides[i].classList.remove("active");
        }
        slides[index].classList.add("active");     

        }

        setInterval(function(){
            nextSlide.click();
        }, 8*1000);
    }

    mainTitleTemplate(){
        return `
            <section class="jumbotron text-center">
                    <div class="container">
                        <h1 class="jumbotron-heading">KATANA SUSHI</h1>
                        <p class="lead text-muted mb-0">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte...</p>
                    </div>
                </section>
        `
    }


    actionSlideTemplate(action, index){
        return `
            <div class="custom-item">
                <img src="${action.img}">
                <div class="caption">
                    <a href="#action/${action.url}"><h2 class="display-5 text-light">${action.name}</h2></a>
                </div>
            </div>
        `;
    }

   

    getHash(){
        return this.hash;
    }
}