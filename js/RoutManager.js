import MainManager from "./MainManager.js";

export default class RoutManager {
    constructor({products_end_poins, actions_end_poins, categories_end_poins}, mainManager) {
        window.addEventListener('hashchange', () => this.onRouteChange());

        this.end_points = {
            "catalog" : categories_end_poins,
            "action" : actions_end_poins,
            "product" : products_end_poins,
            "cart" : products_end_poins,
            "order" : null
        }

        this.mainManager = mainManager;


        if (window.location.hash)
            if (!this.loadContent(window.location.hash.substring(1)))
                this.loadDefaultMain();
    }

    onRouteChange() {
        const hashLocation = window.location.hash.substring(1);
        const splitedHash = hashLocation.split('/');

        console.log("Hash changed!")
        console.log(splitedHash);

        let mainLocation;
        let subLocation;

        if (splitedHash.length == 2){
            mainLocation = splitedHash[0];
            subLocation = splitedHash[1];

            if (!this.loadContent(mainLocation, subLocation))
                this.loadDefaultMain();
        }

        else if (splitedHash.length == 1) {
            mainLocation = splitedHash[0];

            if (!this.loadContent(mainLocation))
                this.loadDefaultMain();
        }
        else {
            this.loadDefaultMain();
        }

    }

    

    loadContent(mainLocation, subLocation=null) {
        
        if (mainLocation in this.end_points) {
            if (subLocation != null && this.end_points[mainLocation].includes(subLocation)) {
                this.mainManager.loadByHash(mainLocation, subLocation);
                return true;
            }
            else if (subLocation == null){
                this.mainManager.loadByHash(mainLocation);
                return true;
            }
            
        }
        return false;
        
    }

    loadDefaultMain(){
        history.pushState(null, null, '/');
        this.mainManager.loadMainPage();
    }
}