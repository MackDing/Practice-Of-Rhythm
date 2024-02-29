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
