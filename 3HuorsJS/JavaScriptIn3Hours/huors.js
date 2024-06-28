


// https://www.youtube.com/watch?v=PkZNo7MFNFg&list=PLWKjhJtqVAbleDe3_ZA8h3AO2rXar-q2V


var number = 5;// in-line connmet

/*
multi-line comment
*/


/*
Data Types:
undefined, null, boolean, string, symbol, number, object
*/

var myName = 'Beau';
console.log(myName);

myName = 8;

let ourName = "freeCodeCamp";
console.log(ourName.length);

const pi = 3.14;
console.log(myName, ourName, pi);

var a;
var b = 2;
a = 7;
b = a;
console.log(a, b);

var myStr = "I am a \"double\" quoted string inside \"double quotes\"";

var myStrUrl = `'<a href="https://www.youtube.com/redirect?event=video_description&amp;</a>'`;

var myStr = 'I am a \\"double\n" quoted string inside \r"double quotes\t';

var myStr = "This is the first sentence. ";
myStr += "This is the second sentence.";
console.log(myStr);

var lastName = "Lovelace";
var thirdLetterOfLastName = lastName[2];
console.log(thirdLetterOfLastName);


var myArray = [["John,23"], ["dog", 3]];
var removedFromMyArray = myArray.shift();
console.log(removedFromMyArray);  // 
console.log(myArray);

//add -- unshift  push
//del -- shift    pop  

function myLocalScope() {
  var myVar = 567;
  console.log(myVar);
}
myLocalScope();

// console.log(myVar);

function nextInLine(arr, item) {
  arr.push(item);
  console.log(item);
  return arr.shift();
};

var testArr = [1, 2, 3, 4, 5];

console.log("Before: " + JSON.stringify(testArr));
console.log(nextInLine(testArr, 6));
console.log("After: " + JSON.stringify(testArr));


var testObj = {
  12: "Namath",
  16: "Montana",
  19: "Unitas"
};

var playerNumber = 16;
var player = testObj[playerNumber];
console.log(player);


const personal = {
  name: 'Tom',
  age: '22',
};
const { name, age } = personal;
console.log(name); // 'Tom'
console.log(age);  // '22'


var ourDog = {
  "name": "Camper",
  "legs": 4,
  "tails": 1,
  "friends": ["everything!"]
};

ourDog['bark'] = 'woof';
console.log(ourDog);

delete ourDog['friends'];
console.log(ourDog);

var myObj = {
  gift: "pony",
  pet: "kitten",
  bed: "sleigh"
};

function checkObj(checkProp) {
  if (myObj.hasOwnProperty(checkProp)) {
    return myObj[checkProp];
  } else {
    return "Not Found";
  }

}

console.log(checkObj("gift"));

var myMusic = [
  {
    "artist": "Billy Joel",
    "title": "Piano Man",
    "release_year": 1973,
    "formats": [
      "CD",
      "8T",
      "LP"
    ],
    "gold": true
  },
  {
    "artist": "Billy Joel",
    "title": "Piano Man",
    "release_year": 1973,
    "formats": [
      "YouTube video",
      "8T"]
  }];
console.log(myMusic[0].gold);

// Setup write collection json object
var collection = {
  2548: {
    album: "Slippery When Wet",
    artist: "Bon Jovi",
    tracks: [
      "Let It Rock",
      "You Give Love a Bad Name"
    ]
  },
  2468: {
    album: "1999",
    artist: "Prince",
    tracks: [
      "1999",
      "Little Red Corvette"
    ]
  },
  1245: {
    artist: "Robert Palmer",
    tracks: []
  },
  5439: {
    album: "ABBA Gold"
  }
};

var collectionCopy = JSON.parse(JSON.stringify(collection));

function updateRecords(id, prop, value) {
  if (value === "") {
    console.log(collection[id][prop]);
    delete collection[id][prop];
  } else if (prop === "tracks") {
    collection[id][prop] = collection[id][prop] || [];
    collection[id][prop].push(value);
  } else {
    collection[id][prop] = value;
    console.log(`is ${collection[id][prop]}`);
    console.log(`is value ${value}`);
  }
  return collection;
}

// console.log(updateRecords(2468, "tracks", "test"));
// console.log(updateRecords(5439, "artist", "ABBA"));


var myArray = [];
var i = 0;
while (i < 5) {
  myArray.push(i);
  i++;
}
console.log(myArray);

var ourArray = [];
for (var i = 0; i < 5; i++) {
  ourArray.push(i);
}
console.log(ourArray);


var myArray = [];
for (var i = 1; i < 6; i++) {
  myArray.push(i);
}


var sum = 0;
for (var n = 0; n < 101; n++)
  if (n % 2 !== 0) {
    // if (i % 2 === 0) {
    // numbers.push(n);
    sum += n;
  }
console.log(sum);


// count Numbers from 1 to 100 are added
var count = 0;
for (var i = 1; i <= 100; i++) {
  count += i;
}
console.log(`count is: ${count}`);

// Even numbers from 1 to 100 are added
var sum = 0;
for (var i = 1; i <= 100; i++) {
  if (i % 2 === 0) {
    sum += i;
  }
}
console.log(`sum is: ${sum}`);

var ourArr = [9, 10, 11, 12, 13, 14];
console.log(`ourArr.length is: ${ourArr.length}`);

function multiplyAll(arr) {
  var product = 1;
  for (let i in arr) {
    for (let j = 0; j < arr[i].length; j++) {
      product *= arr[i][j];
    }
  }
  return product;
}
var product = multiplyAll([[1, 2], [3, 4], [5, 6, 7]]);
console.log(`product is: ${product}`);


var myArray = [];
vari = 10;
do {
  myArray.push(i);
  i++;
} while (i < 5);
console.log(`myArray, i are: ${myArray} ${i}`);

var randomNumberBetween0and19 = Math.floor(Math.random() * 20);
function randomWholeNum() {
  return Math.floor(Math.random() * 10);
}
console.log(`randomNumberBetween0and19 are: ${randomNumberBetween0and19}`);

function randomWholeNRange(mymin, myMax) {
  return Math.floor(Math.random() * (myMax - mymin + 1)) + mymin;
}
var myRandom = randomWholeNRange(5, 15);
console.log(`myRandom are: ${myRandom}`);


function covertToInteger(str) {
  return parseInt(str, 2);
}
let string = covertToInteger("56");
console.log(string);
console.log(typeof string);

// condition ? statement-if-ture : statement-if-false;
function checkEqual(a, b) {
  return a === b ? "Equal" : "Not Equal";
  return a, b;
}
console.log(checkEqual(1, 2));


function checkSign(num) {
  return num > 0 ? "positive" : num < 0 ? "negative" : "zero";
}
console.log(checkSign(10));
console.log(checkSign(-10));
console.log(checkSign(0));

function checkScope() {
  "use strict";
  let i = "function scope";
  if (i === "function scope") {
    i = "block scope";
    return i;
  }
  return i;
}
console.log(checkScope());


const magic = () => new Date();
console.log(magic());

// merge array
const myConcat = (arr1, arr2) => arr1.concat(arr2);
console.log(myConcat([1, 2], [3, 4, 5]));

const realNumberArray = [4, 5.6, 'cto', -9.8, 3.14, 42, 6, 8.34, -2, "nba"];
const squareList = (arr) => {
  const squaredIntegers = arr.filter(num => Number.isInteger(num) && num > 0).map(num => num * num);
  return squaredIntegers;
};
console.log(`squareList(realNumberArray) are: ${squareList(realNumberArray)}`);


const sum1 = (function () {
  return function sum1(...args) {
    return args.reduce((a, b) => a + b, 0);
  };
})();
console.log(sum1(1, 2, 3, 4, 5, 6, 7, 8, 9));
console.log(sum1([1, 2, 3, 4, 5, 6, 7, 8, 9]));

const arr1 = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
let arr2;
(function () {
  arr2 = [...arr1];
  arr1[0] = 'potato';
  console.log(arr1);
})();
console.log(`arr2 are: ${arr2}`);


var voxel = { x: 3.6, y: 7.4, z: 6.54 };
var x = voxel.x;
var y = voxel.y;
var z = voxel.z;
const { x: e, y: f, z: g } = voxel; // a=3.6, b=7.4, c=6.54

const AVG_TEMPERATURES = {
  today: 77.5,
  tomorrow: 79
};

function getTempOfTmrw(avgTemperatures) {
  "use strict";
  const { tomorrow: tempOfTomorrow } = avgTemperatures;
  return tempOfTomorrow;
}
console.log(getTempOfTmrw(AVG_TEMPERATURES));

const [mm, nn, , oo] = [1, 2, 3, 4, 5, 6, 7];
console.log(mm, nn, oo);

// Immediately Invoked Function Expression，IIFE
let aa = 8, bb = 6;
(() => {
  "use strict";
  console.log(aa, bb);
  [aa, bb] = [bb, aa];
  console.log(aa, bb);
})();
console.log(`aa is: ${aa}`);
console.log(bb);

const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function removeFirstTwo(list) {
  "use strict";
  const [, , ...arr] = list;
  return arr;
}
console.log(removeFirstTwo(source), source);


const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.45,
  min: -0.56,
  average: 35.85
};
const half = (function () {
  return function half({ max, min }) {
    return (max + min) / 2.0;
  };
})();
(() => { console.log(stats, half(stats)); })();


const person = {
  name: "Zodiac Hasbro",
  age: 56
};
const greeting = `Hello, my name is ${person.name} I am ${person.age} years old.`;
console.log(greeting);

const result = {
  success: ["max-length", "no-amd", "prefer-arrow-functions"],
  failure: ["no-var", "var-on-top", "linebreak"],
  skipped: ["no-extra-semi", "no-dup-keys"]
};
function markList(arr) {
  const resultDisplayArray = [];
  for (let i = 0; i < arr.length; i++) {
    resultDisplayArray.push(`<li class="list-group-item">${arr[i]}</li>`);
  }
  return resultDisplayArray;
}
console.log(markList(result.failure));


const createPerson = (name, age, gender) => ({ name, age, gender });
console.log(createPerson("Zodiac Hasbro", 56, "male"));


const bicycle = {
  gear: 2,
  setGear(newGear) {
    "use strict";
    this.gear = newGear;
    return this.gear;
  }
};
bicycle.setGear(3);
console.log(bicycle.gear);


var SpaceShuttle = function (targetPlanet) {
  this.targetPlanet = targetPlanet;
};
var zeus = new SpaceShuttle('Jupiter');
console.log(zeus.targetPlanet);


function makeClass() {
  class Vegetable {
    constructor(name) {
      this.name = name;
    }
  }
  return Vegetable;
}
const Vegetable = makeClass();
const carrot = new Vegetable('carrot');
console.log(carrot.name);

class book {
  constructor(author) {
    this._author = author;
  }
  get writer() {
    return this._author;
  }
  set writer(updatedAuthor) {
    this._author = updatedAuthor;
  }
}

// 创建一个立即执行的函数表达式（IIFE），它包含一个类的定义。
function makeClass() {
  // 定义一个名为 "Thermostat" 的类
  class Thermostat {
    constructor(temp) {
      // 类的构造函数，接受一个参数 "temp"，用于初始化温度属性。
      // 将输入的华氏温度转换为摄氏温度并存储在私有属性 "_temp" 中。
      this._temp = 5 / 9 * (temp - 32);
    }
    // 定义 "temperature" 的 getter 方法，用于获取温度。
    get temperature() {
      return this._temp;
    }
    // 定义 "temperature" 的 setter 方法，用于更新温度。
    set temperature(updatedTemp) {
      this._temp = updatedTemp;
    }
    // 返回定义的 "Thermostat" 类，以便后续使用。
  } return Thermostat;
}
// 创建一个名为 "Thermostat" 的变量，并将其赋值为 IIFE 返回的 "Thermostat" 类。
const Thermostat = makeClass();
// 使用 "Thermostat" 类创建一个名为 "thermos" 的实例，初始温度为 76 华氏度。
const thermos = new Thermostat(76);
// 使用 setter 方法将温度更新为 26 摄氏度。
thermos.temperature = 26;
// 使用 getter 方法获取更新后的温度。
let temp = thermos.temperature;
// 打印最终温度值（26 摄氏度）。
console.log(temp);

/*
export const capitalizeString = str => str.toUpperCase();

import { capitalizeString; } from "./script.js";
const cap = capitalizeString("hello!");
console.log(cap);
*/

/*
const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export { capitalizeString };
export const foo = "bar";
export const bar = "foo"
*/


/* 
import * as capitalizeString from "fileName";
*/


/* 
export default function subtract(x, y) { return x - y; }
*/


/*
import subtract from "./script.js";
subtract(7, 4)
 */
