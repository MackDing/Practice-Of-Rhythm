'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANK LIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = movements => {
  containerMovements.innerHTML = '';
  // .textContent = 0

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>

      <div class="movements__value">${mov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  // for (const [i, mov] of movements.entries()) {
  //   const type = mov > 0 ? 'deposit' : 'withdrawal';

  //   const html = `
  //   <div class="movements__row">
  //     <div class="movements__type movements__type--${type}">${
  //     i + 1
  //   } ${type}</div>

  //     <div class="movements__value">${Math.abs(mov)}</div>
  //   </div>
  //   `;

  //   containerMovements.insertAdjacentHTML('afterbegin', html);
  // }
};
displayMovements(account1.movements);

// MAP
console.log('MAP' + '-'.repeat(33));
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);
// console.log(accounts);
// console.log(createUserNames(accounts)); //undefined

const calcPrintBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

calcPrintBalance(account1.movements);

// FILTER
console.log('FILTER' + '-'.repeat(33));
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function (mov, index, array) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositFor = [];
for (const mov of movements) if (mov > 0) depositFor.push(mov);
console.log(depositFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// REDUCE (accumulator -> SNOWBALL)
console.log('REDUCE' + '-'.repeat(33));
console.log(movements);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration i:${i}, acc: ${acc}, cur: ${cur}, arr: ${arr}`);
//   //   //Iteration i:0, acc: 0, cur: 200, arr: 200,450,-400,3000,-650,-130,70,1300
//   //   //Iteration i:1, acc: 200, cur: 450, arr: 200,450,-400,3000,-650,-130,70,1300
//   //   //Iteration i:2, acc: 650, cur: -400, arr: 200,450,-400,3000,-650,-130,70,1300
//   //   //Iteration i:3, acc: 250, cur: 3000, arr: 200,450,-400,3000,-650,-130,70,1300
//   //   //...
//   return acc + cur;
// }, movements[0]);
// console.log(balance);

const balance1 = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance1);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, cur) => {
  if (acc > cur) return acc;
  else return cur;
}, movements[0]);
console.log(max);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/* 
// SLICE
console.log('-'.repeat(33) + 'arr' + '-'.repeat(33));
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log('SLICE' + '-'.repeat(33));
console.log(arr.slice(2));
console.log(arr.slice(0, 2));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

console.log(arr.slice(0));
console.log(arr.slice(-0));
console.log(arr.slice([...arr]));
console.log([...arr]);
console.log(arr);

// SPLICE
console.log('SPLICE' + '-'.repeat(33));
arr.splice(-1);
console.log(arr);
console.log(arr.splice(1, 2));
console.log(arr);

// REVERSE
console.log('REVERSE' + '-'.repeat(33));
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['i', 'j', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
console.log('CONCAT' + '-'.repeat(33));
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log('JOIN' + '-'.repeat(33));
console.log(letters.join(' - '));
 */

/* const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting last array element
console.log(arr.length);
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1));
console.log(arr.slice(-1)[0]);
console.log(arr.slice((-1)[0]));
console.log(arr.slice((-100)[111]));
console.log(arr.at(-1));

console.log('Jonas'.at(0));
console.log('Jonas'.at(-1));
 */
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('-'.repeat(5) + 'FOREACH' + '-'.repeat(5));
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

movements.forEach(movement => {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});

movements.forEach((movement, index, array) => {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// 3: function(3000)
// ...
 */

/* 
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

console.log('-'.repeat(11));
currenciesUnique.forEach((value, _, map) => {
  console.log(`${value}: ${value}`);
});
// 由于在Set中键和值是等价的，所以输出的结果是元素值和其本身，如"USD: USD"。
 */

//https://banklist.netlify.app/
//js@1111
//jd@2222

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/* 
const checkDogs = (dogsJulia, dogsKate) => {
  // console.log(dogsJulia, dogsKate);
  dogsJulia = dogsJulia.slice(1, -2);
  const dogs = dogsJulia.concat(dogsKate);
  // console.log(dogsJulia, dogsKate);
  // console.log(dogs);
  dogs.forEach((dog, i) => {
    const status =
      dog >= 3 ? `an adult, and is ${dog} years old` : 'still a puppy 🐶';
    console.log(`Dog number ${i + 1} is ${status}`);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('-'.repeat(33));
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
 */
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

// const members = ['Taylor', 'Donald', 'Don', 'Natasha', 'Bobby'];
// const announcements = members.map(member => {
//   return member + ' joined the contest.';
// });
// console.log(announcements);

const movementsDescriptions = movements.map(
  (movement, index) =>
    `Movement ${index + 1}: You ${
      movement > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(movement)}`
);
console.log(movementsDescriptions);
 */
// slice, splice, map, filter, reduce ,set
