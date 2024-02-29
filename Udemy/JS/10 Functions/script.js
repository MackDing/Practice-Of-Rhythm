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

console.log('$'.repeat(66));
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

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

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer:123,
};
