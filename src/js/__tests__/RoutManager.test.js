import RoutManager from "../RoutManager";

import MainManager from "../MainManager";
jest.mock('../MainManager');

describe("RoutManager class", ()=>{
    let _;
    let d;
    let m;
    beforeEach(()=>{
        d = {products_end_poins :["test_url1"],
            actions_end_poins: ["test_url2"],
            categories_end_poins: ["test_url3"],
            orders_end_points: ["test_url4"]};
        m = new MainManager();
        _ = new RoutManager(d, m);
        MainManager.mockClear();
    });
    describe("RoutManager: loadDefaultMain", ()=>{
        it("should load default page", ()=>{
            _.loadDefaultMain();
            expect(m.loadMainPage).toHaveBeenCalledTimes(1);
        });

        it("should change history", ()=>{
            _.loadDefaultMain();
            expect(window.location.hash).toBeFalsy();
        })
    });

    describe("RoutManager: init", ()=>{
       it("window hash exist", ()=>{
           history.pushState(null, null, '#test');
           const loadDefaultMain = RoutManager.prototype.loadDefaultMain = jest.fn();

           _ = new RoutManager(d, m);
           expect(loadDefaultMain).toHaveBeenCalledTimes(1);
       })
   });

    describe("RoutManager: loadContent", ()=>{
        it("should process subLocation == null and mainLocation exist", ()=>{
            expect(_.loadContent('catalog')).toBeTruthy();
            expect(m.loadByHash).toHaveBeenCalledTimes(1);
            expect(m.loadByHash).toHaveBeenCalledWith('catalog');
        });

        it("should process subLocation == null and mainLocation DO NOT exist", ()=>{
            expect(_.loadContent('test')).toBeFalsy();
        });

        it("should process subLocation and mainLocation exist", ()=>{
            expect(_.loadContent('catalog', "test_url3")).toBeTruthy();
            expect(m.loadByHash).toHaveBeenCalledTimes(1);
            expect(m.loadByHash).toHaveBeenCalledWith('catalog', "test_url3");
        });

        it("should process subLocation DO NOT EXIST and mainLocation exist", ()=>{
            expect(_.loadContent('catalog', "test")).toBeFalsy();
        });


    });

    describe("RoutManager: onRouteChange", ()=>{
        it("should process without subLocation / case loadContent -> true ", ()=>{
            history.pushState(null, null, '#test');

            const loadDefaultMain = RoutManager.prototype.loadDefaultMain = jest.fn();
            loadDefaultMain.mockClear();
            const loadContent = jest.fn((hash)=>{
                return true;
            });
            RoutManager.prototype.loadContent = (hash)=>{
                return loadContent(hash);
            };
            loadContent.mockClear();

            _.onRouteChange();
            expect(loadContent).toHaveBeenCalledTimes(1);
            expect(loadContent).toHaveBeenCalledWith('test');
            expect(_.loadContent()).toBeTruthy();
            expect(loadDefaultMain).not.toHaveBeenCalled();
        });

        it("should process without subLocation / case loadContent -> false ", ()=>{
            history.pushState(null, null, '#test');


            const loadDefaultMain = RoutManager.prototype.loadDefaultMain = jest.fn();
            loadDefaultMain.mockClear();
            const loadContent = jest.fn((hash)=>{
                return false;
            });
            RoutManager.prototype.loadContent = (hash)=>{
                return loadContent(hash);
            };
            loadContent.mockClear();

            _.onRouteChange();
            expect(loadContent).toHaveBeenCalledTimes(1);
            expect(loadContent).toHaveBeenCalledWith('test');
            expect(_.loadContent()).toBeFalsy();
            expect(loadDefaultMain).toHaveBeenCalled();
        });

        it("should process with subLocation / case loadContent -> false ", ()=>{
            history.pushState(null, null, '#test/test');

            const loadDefaultMain = RoutManager.prototype.loadDefaultMain = jest.fn();
            loadDefaultMain.mockClear();
            const loadContent = jest.fn((hash, subLocation)=>{
                return false;
            });
            RoutManager.prototype.loadContent = (hash, subLocation)=>{
                return loadContent(hash, subLocation);
            };
            loadContent.mockClear();

            _.onRouteChange();
            expect(loadContent).toHaveBeenCalledTimes(1);
            expect(loadContent).toHaveBeenCalledWith('test', 'test');
            expect(_.loadContent()).toBeFalsy();
            expect(loadDefaultMain).toHaveBeenCalled();
        });

        it("should process with subLocation / case loadContent -> true ", ()=>{
            history.pushState(null, null, '#test/test');

            const loadDefaultMain = RoutManager.prototype.loadDefaultMain = jest.fn();
            loadDefaultMain.mockClear();
            const loadContent = jest.fn((hash, subLocation)=>{
                return true;
            });
            RoutManager.prototype.loadContent = (hash, subLocation)=>{
                return loadContent(hash, subLocation);
            };
            loadContent.mockClear();

            _.onRouteChange();
            expect(loadContent).toHaveBeenCalledTimes(1);
            expect(loadContent).toHaveBeenCalledWith('test', 'test');
            expect(_.loadContent()).toBeTruthy();
            expect(loadDefaultMain).not.toHaveBeenCalled();
        });

        it("should process with length > 3", ()=>{
            history.pushState(null, null, '#test/test/test');

            const loadDefaultMain = RoutManager.prototype.loadDefaultMain = jest.fn();
            loadDefaultMain.mockClear();

            _.onRouteChange();

            expect(loadDefaultMain).toHaveBeenCalledTimes(1);
        });
    });

});