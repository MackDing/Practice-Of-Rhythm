// Remember, we're gonna use strict mode in all scripts now!
'use strict';


// const x = 23;
// if (x === 23) console.log(23);
// const calcAge = birthYear => 2037 - birthYear;
// console.log(1912);

// 'use strict';


///////////////////////////////////////
// Using Google, StackOverflow and MDN

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what do do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

/*
const calcTempAmplitudeNew = function (t1, t2) {
  const array1 = ['a', 'b', 'c'];
  const array2 = ['d', 'e', 'f'];
  const array3 = ['g', 'h', 'i'];

  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;

  }
  console.log(max, min);
  return max - min;
};
calcTempAmplitudeNew([3, 7, 4, 23, 8, 1, 66], [1, -3, -5, -7, -8, -36]);
// const amplitudeNew = calcTempAmplitudeNew(temperatures);
// console.log(amplitudeNew);
*/

/*
const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    // C) FIX
    // value: Number(prompt('Degrees celsius:')),
    value: Number(prompt('Degrees celsius: ')),
  };
  debugger;

  console.log(measurement);
  console.table(measurement);
  // console.log(measureKelvin.value);
  // console.warn(measureKelvin.value);
  // console.error(measureKelvin.value);

  const kelvin = measurement.value + 273;
  return kelvin;
};
console.log(measureKelvin());
*/

///////////////////////////////////////
// Coding Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/


const temperaturesArr = [17, 21, 23];
const temperaturesArr2 = [12, 5, -5, 0, 4];

// function printForecast(arr) {
//   for (let i in arr)
//     console.log(`... ${arr[i]} in ${Number(i) + 1} days `);
// }

function printForecast(arr) {
  let str = '';
  for (let [index, forecast] of arr.entries())
    str += `... ${forecast} in ${index + 1} days `;
  console.log(str);
}

printForecast(temperaturesArr);
printForecast(temperaturesArr2);