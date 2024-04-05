let array = [1, 2, 3, 4];

// let total=0
// array.forEach(item => total += item)
// console.log(total)

// let total = 0;
// for (let item = 0; item < array.length; item++) {
//   total += array[item];
// }
// console.log(total);

let total = array.reduce((prev, current, index, self) => {
  console.log(prev, current, index, self);
  return prev + current;
}, 0);
console.log(total);

let total1 = array.reduce((prev, current) => prev + current, 0);
console.log(total1);

let array1 = [
  { name: "张三", age: 29 },
  { name: "李四", age: 16 },
  { name: "王五", age: 50 },
  { name: "小明", age: 21 },
];

let newArray = array1.reduce((prev, current, index) => prev + current.age, 0);
console.log(newArray);

let arrs2 = [5, 6, 1, 22, 3, 7];
let max = arrs2.reduce((prev, current) => Math.max(prev, current), 0);
console.log(max);

let min = arrs2.reduce((prev, current) => Math.min(prev, current), 0);
console.log(min);

let min1 = arrs2.reduce((prev, current) => Math.min(prev, current));
console.log(min1);

let result = arrs2.reduce((prev, current) => prev + current, 0);
console.log(result / arrs2.length);

let result1 = array1.reduce((prev, current) => prev + current.age, 0);
console.log(result1 / array1.length);
