import MainManager from "../MainManager";
import CatalogManager from "../CatalogManager";
import HomeManager from "../HomeManager";
import CartManager from "../CartManager";
import OrderManager from "../OrderManager";
jest.mock('../CatalogManager');
jest.mock('../HomeManager');
jest.mock('../CartManager');

describe('class MainManager', ()=>{
    let _;

    beforeEach(()=>{
        CatalogManager.mockClear();
        HomeManager.mockClear();
        CartManager.mockClear();

        _ = new MainManager();
    });

    describe('MainManager: getManagerByHash', ()=>{
        it('should return manager by hash', ()=>{
            CartManager.prototype.hash = 'cart';
            let t = new OrderManager();
            _ = new MainManager([t]);
            expect(_.getManagerByHash('order')).toBeInstanceOf(OrderManager);
        });
    });

    describe('MainManager: loadCart', ()=>{


        it("should init child Managers", ()=>{
            const mainManager = new MainManager([new CatalogManager()], new HomeManager());
            expect(CatalogManager).toHaveBeenCalledTimes(1);
            expect(HomeManager).toHaveBeenCalledTimes(1);
        });

        it("should invoke loadCartFromLocalStorage", ()=>{
            const getManagerByHash = jest.fn();
            MainManager.prototype.getManagerByHash = function (){
              return getManagerByHash();
            };

            getManagerByHash.mockReturnValue(new CartManager())
            _.loadCart();
            expect(CartManager).toHaveBeenCalledTimes(1);
            expect(getManagerByHash).toHaveBeenCalledTimes(1);
        });
    });

    describe('MainManager: loadMainPage', ()=>{
        it('should invoke loadMainPage on home Manager', ()=>{
            _ = new MainManager([], new HomeManager());
           _.loadMainPage();
           expect(HomeManager).toHaveBeenCalledTimes(1);
        });
    });

    describe('MainManager: loadByHash', ()=>{
        it('should load manager by its hash', ()=>{
            let t = new CartManager();
            const loadMainPage = MainManager.prototype.loadMainPage = jest.fn();
            t.onLoad.mockReturnValue(true);

            _.loadByHash()
            expect(t.onLoad()).toBeTruthy();
            expect(loadMainPage).toHaveBeenCalledTimes(1);
        });
        it('should load false', ()=>{
            let t = new CartManager();
            const loadMainPage = MainManager.prototype.loadMainPage = jest.fn();
            t.onLoad.mockReturnValue(false);

            _.loadByHash()
            expect(t.onLoad()).toBeFalsy();
            expect(loadMainPage).toHaveBeenCalledTimes(1);
        });
    });



})