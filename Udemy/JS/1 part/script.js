/* let js = "amazing";
// if (js === 'amazing') alert('js is amazing')

console.log(40 + 8 + 23 - 10);


console.log("Jonas");
console.log(23);

let firstName="Matilda";


console.log(firstName);
console.log(firstName);
console.log(firstName);



let jonas_matilda = "JM";
let $function = 27;

let person = "jonas";
let PI = 3.1415;

let myFirstJob = 'Coder';
let CurrentJob = 'Teacher';

let job1 = "programmer";
let job2 = "teacher"

console.log(myFirstJob);


// true;
console.log(true);
let javascriptIsFun = true;


// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof 'Jonas');


javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);

let happy;
console.log(happy);
console.log(typeof happy);

happy = 1991;
console.log(happy);
console.log(typeof happy);


console.log(typeof null);



let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990;
// const job;

var job = 'programmer';
job = 'teacher'

lastName = 'Schmedtman';
console.log(lastName);

////////////////////////////////////
// Basic Operators
// Math operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = 'Jonas';
const lastName = 'Schmedtman';
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1
x--;
x--;
console.log(x);

// Comparison operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);

////////////////////////////////////
// Operator Precedence
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);
*/



// Coding Challenge #1
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

GOOD LUCK 😀
*/
/*
// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;
const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;


const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / heightJohn ** 2;

const markHigherBMI = BMIMark > BMIJohn;
console.log(BMIMark, BMIJohn, markHigherBMI);
*/

/*
const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;

const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + ' years old' + job + '!';

console.log(jonas);

const jonas1 = "I'm " + 1;
console.log(jonas1);

const jonasNew = `I'm ${firstName}, a ${year - birthYear} years old + year old ${job}!`;

//view jonasNew
console.log(jonasNew);
console.log(`just a regular string...`);
console.log(`String with \n\
multiple \n\
lines`);


console.log(`String
multiple
lines`)
*/



/*
const age = 9;
const isOldEnough = age >= 18;

if (isOldEnough) {
  console.log('Sarah can start driving license 🚗');
}
else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years for the ride! years:`);
}

const birthYear = 1991;
let century;

if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);
*/





////////////////////////////////////
// Coding Challenge #2

/*
Use the BMI example from Challenge #1, and the code you already wrote, and improve it:

1. Print a nice output to the console, saying who has the higher BMI. The message can be either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

HINT: Use an if/else statement 😉

GOOD LUCK 😀
*/

/*
const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;


const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / heightJohn ** 2;


if (BMIMark > BMIJohn) {
  console.log(`Mark's BMI (${BMIMark}) is higher than John's!`);
} else {
  console.log(`John's BMI (${BMIJohn})is higher than Mark's!`);
}
*/

/*
const inputYear = '1991';

console.log(Number(inputYear), inputYear);
console.log(inputYear + 18);

console.log(Number('Jonas'));
console.log(typeof NaN);
console.log(String(23), 23);


console.log('I am ' + 23 + ' years old');
console.log('I am ' + 23 + ' years old');
console.log('I am ' + String(23) + ' years old');

console.log('23' - '10' - 3);
console.log('23' * '2');
console.log('23' / '2');


let n = '1' + 1; // '11'
n = n - 1;
console.log(n);

let m = '2' + 3;
m++;
console.log(m);

console.log(2 + 3 + 4 + '5');
console.log('10' - '4' - '3' - 2 + '5')
*/

/*
// 5 falsy values:0, '', undefined, null, Nan
console.log(Boolean(0));           //false
console.log(Boolean(undefined));   //false
console.log(Boolean(''));          //false
console.log(Boolean(-1));          //true
console.log(Boolean('Jonas'));     //true
console.log(Boolean("Jonas"));     //true
console.log(Boolean(`Jonas`));     //true
console.log(Boolean({}));          //true


const money = 0;
if (money) {
  console.log("Don't spend it all;");
} else {
  console.log('You should get a money!');
}


let height = 123;
if (height) { console.log('YAY! Height is defined'); }
else { console.log('Height is UNDEFINED'); }
*/

/*
const age = '18';
if (age === 18) console.log('You just became an adult :D (strict)');

if (age == 18) console.log('You just became an adult :D (loose)');

const favourite = Number(prompt("What's your favourite number?"));
console.log(favourite);
console.log(typeof favourite);

if (favourite === 23) {
  console.log('Cool! 23 is an amazing number!');
} else if (favourite === 7) {
  console.log('7 is also a cool number');
} else if (favourite === 111) {
  console.log('111 is great');
} else if (favourite === 222) {
  console.log('222 is so good!');
} else { console.log('Number is other'); }

if (favourite !== 23) {
  console.log("why not 23?");
}
*/

/*
const hasDriversLicense = true;  // A
const hasGoodVision = true;      // B
console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(hasDriversLicense != hasGoodVision);
console.log(!hasDriversLicense && hasGoodVision);
console.log(!hasDriversLicense);
console.log(!hasGoodVision);


// if (!hasGoodVision) {
//   console.log('Sarah is able to drive!');
// } else if (!hasDriversLicense) {
//   console.log('Some else should drive...');
// } else {
//   console.log('other drive...');
// }


const isTired = false;  // C
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log('Sarah is able to drive!');
} else {
  console.log('Some else should drive...');
}
*/

////////////////////////////////////
// Coding Challenge #3

/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins the a trophy!

1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score).

3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. HINT: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.

TEST DATA: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
TEST DATA BONUS 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

GOOD LUCK 😀
*/


// const averageDolphinsScore = (97 + 112 + 101) / 3;
// const averageKoalasScore = (88 + 91 + 110) / 3;

// console.log(averageDolphinsScore, averageKoalasScore);

// if (averageDolphinsScore > averageKoalasScore) {
//   console.log(`Dolphins is win 🏆+ ${averageDolphinsScore}`);
// } else if (averageKoalasScore > averageDolphinsScore) {
//   console.log(`Koalas is win 🏆 + ${averageKoalasScore}`);
// } else if (averageDolphinsScore === averageKoalasScore) {
//   console.log(win - win);
// }


/*
// Bonus
const dolphinsScore = (97 + 112 + 101) / 3;
const koalasScore = (88 + 91 + 110) / 3;

console.log(dolphinsScore, koalasScore);


if (dolphinsScore > koalasScore && dolphinsScore >= 100) {
  console.log(`Dolphins is win 🏆+ ${dolphinsScore.toFixed(2)}`);
} else if (koalasScore > dolphinsScore && dolphinsScore >= 100 && koalasScore) {
  console.log(`Koalas is win 🏆 + ${averageKoalasScore.toFixed(0)}`);
} else if
  (dolphinsScore === koalasScore && dolphinsScore >= 100 && k >= 100) {
  console.log('Both win the trophy!');
} else {
  console.log("No one wins");
}
*/


/*
// const day = 'monday';

// switch (day) {
//   case 'monday':
//     console.log('Plan course structure');
//     console.log('Go to coding meetup');
//     break;
//   case 'tuesday':
//     console.log('Prepare theory videos');
//     break;
//   case 'wednesday':
//   case 'thursday':
//     console.log('write code examples');
//     break;
//   case 'friday':
//     console.log('Record videos');
//     break;
//   case 'saturday':
//   case 'sunday':
//     console.log('Enjoy the weekend :D');
//     break;
//   default:
//     console.log('Not a valid day!');
// }


if (day === 'monday') {
  console.log('Plan course structure');
  console.log('Go to coding meetup');
} else if (day === 'tuesday') {
  console.log('Prepare theory videos');
} else if (day === 'wednesday' || day === 'thursday') {
  console.log('write code examples');
} else if (day === 'friday') {
  console.log('Record videos');
} else if (day === 'saturday' || day === 'sunday') {
  console.log('Enjoy the weekend :D');
} else { console.log('Not a valid day!'); }
*/

/*
3 + 4;
1991;
true && false && !false;

if (23 > 10) {
  const str = '23 is bigger';
}

const me = 'Jonas';
console.log(`I'm ${2037 - 1991} years old ${me}`);

*/

/*
const age = 19;
// age >= 18 ? console.log('I like to drink 🥃') :
//   console.log('I like to water 🥤');

const drink = age >= 18 ? "Wine 🍷" : 'Water 🍼';
console.log(drink);

let drink2;
if (age >= 18) {
  drink2 = "Wine 🍷";
} else {
  drink2 = 'Water 🍼';
}
console.log(drink2);

console.log(`I like to drink ${age >= 18 ? "Wine 🍷" : 'Water 🍼'}`);
*/

////////////////////////////////////
// Coding Challenge #4

/*
Steven wants to build a very simple tip calculator for whenever he goes eating in a restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 300. If the value is different, the tip is 20%.

1. Your task is to calculate the tip, depending on the bill value. Create a variable called 'tip' for this. It's not allowed to use an if/else statement 😅 (If it's easier for you, you can start with an if/else statement, and then try to convert it to a ternary operator!)
2. Print a string to the console containing the bill value, the tip, and the final value (bill + tip). Example: 'The bill was 275, the tip was 41.25, and the total value 316.25'

TEST DATA: Test for bill values 275, 40 and 430

HINT: To calculate 20% of a value, simply multiply it by 20/100 = 0.2
HINT: Value X is between 50 and 300, if it's >= 50 && <= 300 😉

GOOD LUCK 😀
*/

const bill = 300;
let tip;

if (50 <= bill <= 300) {
  tip = bill * 0.15;
  console.log(`bill was ${bill}, tip was ${bill * 0.15}`);
} else {
  tip = bill * 0.20;
  console.log(`bill was ${bill}, tip was ${tip}`);
}
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);

console.log(bill <= 300 && bill >= 50 ? `bill was ${bill}, tip was ${bill * 0.15}, and the total value ${bill + tip}` : `bill was ${bill}, tip was ${bill * 0.20}, and the total value ${bill + tip}`);

const tips = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2;
console.log(`The bill was ${bill}, tip was ${tips}, and the total value ${bill + tips}`);






















































































































































































































































;;;;
