'use strict';

/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millennial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reassigning outer scope's variable
      output = 'New OUTPUT!'

      const str = `Oh, and you're a millennial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b
      }
    }
    // console.log(str);
    console.log(millennial);
    // console.log(add(2, 3));
    console.log(output);
  }
  printAge()
  return age
}

const firstName = 'Jonas'
calcAge(1991)
// console.log(age);
// printAge();
*/

console.log(me);
// console.log(job);
// console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991


// Function 
console.log(addDecl(2, 3));
console.log(addExpr(2, 3));
console.log(addArrow(2, 3));


function addDecl(a, b) {
  return a + b
}

const addExpr = function (a, b) {
  return a + b
}

const addArrow = (a, b) => a + b