


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


const person = {
  name: 'Tom',
  age: '22',
};
const { name, age } = person;
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


var ourArr = [9, 10, 11, 12];
console.log(ourArr.length);

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

console.log(myArray, i);