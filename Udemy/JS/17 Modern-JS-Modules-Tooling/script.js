// Importing module
// import './shoppingCart.js';
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

console.log('Importing module');
// console.log(shoppingCart);

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log(price);

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apple', 4);

console.log(cart);

// https://jsonplaceholder.typicode.com/
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');


// luke yolo json mojo yuki
// 丁语菲 丁语琪 丁语程 丁语曼 丁语茹 丁语辰 丁语琛 丁语诗 丁语芯 丁语绮 丁语棠 丁语宸 丁语祺 丁语凡 丁语行 丁语希/熙/熹 丁语赞 丁语筑 丁语礼 丁语笙/深 丁语东 丁语安 丁语圳

// girl
// 丁语菲 丁语诗 丁语绮/琪/祺 丁语曼 丁语橙/澄 

// boy
// 丁语棠 丁语程/辰/琛/宸 丁语凡 丁语行/航 丁语希/熙/熹

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  //   console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

// Not very clean
// lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);
