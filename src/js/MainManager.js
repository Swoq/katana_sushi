export default class MainManager {
    constructor(managers, homeManager){
        this.managers = managers;
        this.homeManager = homeManager;
    }

    getManagerByHash(hash) {
        for (let i = 0; i < this.managers.length; i++) {
            if (hash === this.managers[i].getHash()){
                return this.managers[i];
            }
        }
    }

    loadByHash(hash, subHash=null){
        let manager = this.getManagerByHash(hash);
        if(!manager.onLoad(subHash))
            this.loadMainPage();
    }

    loadMainPage(){
        this.homeManager.loadMainPage();
    }

    loadCart(){
        let manager = this.getManagerByHash('cart');
        manager.loadCartFromLocalStorage();
    }
}