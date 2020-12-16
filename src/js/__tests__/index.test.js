jest.mock('../async-util');

import CatalogManager from "../CatalogManager";
import HomeManager from "../HomeManager";
import MainManager from "../MainManager";
import OrderManager from "../OrderManager";
import ProductManager from "../ProductManager";
import RoutManager from "../RoutManager";

describe("classes should be defined", ()=>{
    it("CatalogManager", ()=>{
        expect(CatalogManager).toBeDefined();
    });
    it("HomeManager", ()=>{
        expect(HomeManager).toBeDefined();
    });
    it("ProductManager", ()=>{
        expect(ProductManager).toBeDefined();
    });
    it("OrderManager", ()=>{
        expect(OrderManager).toBeDefined();
    });
    it("RoutManager", ()=>{
        expect(RoutManager).toBeDefined();
    });
    it("MainManager", ()=>{
        expect(MainManager).toBeDefined();
    });
});