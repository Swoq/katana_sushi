jest.mock('../async-util');

import init_end_points from "../util";

let end_points;

describe('should init endpoints', () => {
    beforeEach(() => {
        end_points = {actions_end_poins: ["promotion_first", "privedi_druga_second", "privedi_druga_third", "privedi_druga_third"],
            categories_end_poins: ["vegeterian"],
            orders_end_poins: [],
            products_end_poins: ["pizza_mozzarella1", "pizza_four_cheese1", "pizza_mozzarella2", "pizza_mozzarella3", "pizza_mozzarella4", "pizza_mozzarella5", "clear"]};
    });

    it('should be defined', () => {
        expect(init_end_points).toBeDefined();
    });

    it('should init endpoints', () => {
        init_end_points().then(data => {
            expect(data).toStrictEqual(end_points);
        });
    });
});
