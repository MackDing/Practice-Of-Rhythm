'use strict';
/* 
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = { flightNum, numPassengers, price };
  // ES5
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000);
 */
/* 
// passing by value && passing by reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};
const checkIn = function (flightNum, passenger) {
  flightNum = 'Lh999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};

// checkIn(flight, jonas);
// console.log(flight, jonas);

// // Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jonas);
checkIn(flight, jonas);
 */

/* 
// passing by value
function update(b) {
  b = 30;
}

let a = 10;
update(a);
console.log(a); // 输出：10

// passing by reference
function update(obj) {
  obj.name = 'Mack';
}

let personal = { name: 'John Doe' };
update(personal);
console.log(personal.name); // 输出："Mack"
console.log(personal);
 */

/* 
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
// console.log(oneWord('563 4SVS adSSO'));

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
// console.log(upperFirstWord('adidas JAPAN 987 6LOOK LOOKafter12'));

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed string: ${upperFirstWord(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('🧘‍♀️');
};

document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam', 'Max'].forEach(high5);
 */

/* 
const greet = function (greeting) {
  // 这部分定义了一个名为 greet 的函数，这个函数接收一个参数 greeting。
  return function (name) {
    // 这部分定义了 greet 函数的返回值。返回值是一个新的函数，这个函数接收一个参数 name，并打印出 ${greeting} ${name}。
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey'); // 调用greet函数并传入参数"Hey"，greet会返回一个新的函数。我们将这个新的函数保存到了名为greeterHey的变量中。
greeterHey('Jonas');
greeterHey('Max');

greet('Hello')('Jonas');

// Challenge Arrow function
// const greetArr = greeting => {
//   return name => {
//     console.log(`${greeting} ${name}`);
//   };
// };
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hello')('Jonas'); 
*/
/* 
const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function () {},
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(239, 'Jonas Smith');
console.log(lufthansa);
console.log('*'.repeat(99));

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does Not work
// book(23, 'Sarah Williams');

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// Call method
book.call(swiss, ...flightData);
console.log(swiss);

// bind method
console.log('$'.repeat(66));
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper'); 
*/

// let obj = {name: "Tom"};
// let greeting = function(a,b,c){
//     return "welcome "+this.name+" to "+a+" "+b+" in "+c;
// };

// console.log(greeting.call(obj, "New","York","USA"));

// console.log(greeting.apply(obj, ["New","York","USA"])); // the argements are passed in as an array

// let bound = greeting.bind(obj);
// console.log(bound("New", "York", "USA"));
// // In general, the difference between call and apply is that the arguments are written differently, while bind returns a new function that can be executed later.
/* 
//With Event Listeners
lufthansa.planes = 300;
console.log(lufthansa);
console.log('#'.repeat(66));
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
   */
/* 
// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.23, 100));

const addVAT = addTax.bind(null, 0.23);
//addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

// Challenge
console.log('&'.repeat(66));
const addTax1 = function (rate) {
  // 这部分定义了一个名为 greet 的函数，这个函数接收一个参数 greeting。
  return function (value) {
    return value + value * rate;
    // 这部分定义了 greet 函数的返回值。返回值是一个新的函数，这个函数接收一个参数 name，并打印出 ${greeting} ${name}。
  };
};
const addVAT1 = addTax1(0.23); // 调用greet函数并传入参数"Hey"，greet会返回一个新的函数。我们将这个新的函数保存到了名为greeterHey的变量中。
console.log(addVAT1(100));
console.log(addVAT1(23));
// console.log(addVAT1(100)(0.23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const AddVAT2 = addTaxRate(0.23);
console.log(AddVAT2(100));

console.log('arrowFunc '.repeat(11));
const addTaxRate1 = rate => value => value + value * rate;
const AddVAT3 = addTaxRate1(0.23);
console.log(AddVAT3(100));
 */
// const greetArr = greeting => name => console.log(`${greeting} ${name}`);

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favorite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what should the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
/* 
const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer);

    // Register answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    console.log(this.answers);

    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
// poll.registerNewAnswer();

const p = {
  cc: new Array(3).fill(5),
  dd() {
    console.log(this.cc);
  },
};
p.dd();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// BONUS
// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

 */

//****** call、apply、bind 作用和区别
// call(thisArg, arg1, arg2, arg3, ...)
// apply(thisArg, [argsArr])
// bind(thisArg, arg1, arg2, arg3, ...)
/* 
相同点:
    三个都是用于改变this指向；
    接收的第一个参数都是this要指向的对象；
    都可以利用后续参数传参。
不同点
    call和bind传参相同，多个参数依次传入的；
    apply只有两个参数，第二个参数为数组；
    call和apply都是对函数进行直接调用，而bind方法不会立即调用函数(所以要手动调用下，前两个是主动调用)，而是返回一个修改this后的函数。
    修改this的性质不同：
        call、apply只是临时的修改一次，也就是call和apply方法的那一次；当再次调用原函数的时候，它的指向还是原来的指向。
        bind是永久修改函数this指向，但是它修改的不是原来的函数；而是返回一个修改过后新的函数，此函数的this永远被改变了，绑定了就修改不了。
 */
/* 
const runOnce = function () {
  console.log('This will never run again');
};

runOnce();

// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 25;
  var notPrivate = 46;
}

// console.log(isPrivate);
console.log(notPrivate);
 */

// closure
/*
// const passengerCount = 10;
// let passengerCount = 11;
// var passengerCount = 12;
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);
  */
/* 
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  // const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);

// Example 3
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log('outerVariable:', outerVariable);
    console.log('innerVariable:', innerVariable);
  };
}

const newFunction = outerFunction('outside');
newFunction('inside'); // logs: outerVariable: outside, innerVariable: inside
 */

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

// call, apply, bind, closure

/* 
三者都可以改变函数的this对象指向。
三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window。
三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入。
bind 是返回绑定this之后的函数，便于稍后调用；apply 、call 则是立即执行 。 
*/