let data = `
{
  "products": [{
    "url": "pizza_mozzarella1",
    "productName": "Pizza Mozzarella1",
    "productDescription": "About Pizza ... ",
    "price": 155.05,
    "images": ["https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg", "https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg"]
  }, 
  {
    "url": "pizza_four_cheese1",
    "productName": "Pizza 1",
    "productDescription": "About Pizza ... ",
    "price": 155.05,
    "images": ["https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg", "https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg"]
  },
  {
    "url": "pizza_mozzarella2",
    "productName": "Pizza Mozzarella2",
    "productDescription": "About Pizza ... ",
    "price": 155.05,
    "images": ["https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg", "https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg"]
  },
  {
    "url": "pizza_mozzarella3",
    "productName": "Pizza Mozzarella3",
    "productDescription": "About Pizza ... ",
    "price": 155.05,
    "images": ["https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg", "https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg"]
  },
  {
    "url": "pizza_mozzarella4",
    "productName": "Pizza Mozzarella4",
    "productDescription": "About Pizza ... ",
    "price": 155.05,
    "images": ["https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg", "https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg"]
  },
  {
    "url": "pizza_mozzarella5",
    "productName": "Pizza Mozzarella5",
    "productDescription": "About Pizza ... ",
    "price": 155.05,
    "images": ["https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg", "https://images.pizza33.ua/products/menu/CgXF6CgaQBXWj4iercaMJ5zCfvT1ITGC.jpg"]
  }],
  "productsDetail": [{
    "productId": 0,
    "categoryId": 0
  }, 
  {
    "productId": 1,
    "categoryId": 0
  }],
  "productsCategories": [{
    "categoryId": 0,
    "url": "vegeterian",
    "name": "Вегетарианские",
    "description": "More details ... "
  }],
  "actions": [{
    "url": "promotion_first",
    "name": "Promotion 1",
    "description": "Promotion details lorem ipsum.. ",
    "datePosted": "21.02.2020",
    "img": "https://dummyimage.com/1000x300/000/fff.png&text=Promotion+1"
  },
  {
    "url": "privedi_druga_second",
    "name": "Promotion details lorem ipsum..",
    "description": "Детали акции ... ",
    "datePosted": "25.02.2020",
    "img": "https://dummyimage.com/1000x300/000/fff.png&text=Promotion+2"
  },
  {
    "url": "privedi_druga_third",
    "name": "Promotion 3",
    "description": "Promotion details lorem ipsum..",
    "datePosted": "20.02.2020",
    "img": "https://dummyimage.com/1000x300/000/fff.png&text=Promotion+3"
  },
  {
    "url": "privedi_druga_third",
    "name": "Promotion 4",
    "description": "Promotion details lorem ipsum..",
    "datePosted": "26.02.2020",
    "img": "https://dummyimage.com/1000x300/000/fff.png&text=Promotion+4"
  }],
  "orders": []
}

`
let response = {data : data};

let parse_data = {id: 1};

export function get_data(){
    return Promise.resolve(JSON.parse(data));
}

export function sendRequest(){
    return Promise.resolve(parse_data);
}