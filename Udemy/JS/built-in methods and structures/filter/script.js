let arrs = [5, 7, 8, 15, 22, 1, 2];
console.log("This is filter(item, index, self) " + "-".repeat(11));
arrs.filter((item, index, array) => console.log(item, index, array));
arrs.filter((item, index, self) => console.log(item, index, self));

let newArrs = arrs.filter((arr) => true);
console.log(newArrs);

let newArrs1 = arrs.filter((arr) => arr > 10);
console.log(newArrs1);

let arrs1 = [
  { name: "张三", age: 16 },
  { name: "李四", age: 40 },
  { name: "王五", age: 28 },
  { name: "汤姆", age: 20 },
];

let young = arrs1.filter((item) => item.age <= 20);
console.log(young);

let arrs2 = [
  { id: 1, name: "HTML5" },
  { id: 2, name: "JavaScript" },
  { id: null, name: "小程序" },
  { name: "NodeJS" },
  { id: 3, name: "VueJS" },
  { id: null, name: null },
];
let newArrs2 = arrs2.filter((item) => item.id);
console.log(newArrs2);

//JavaScript 语言中的 falsy 值有： false, 0, ''(空字符串), NaN, null, undefined.

// let arrs3 = [6, 1, 2, 3, 5, 3, 6];
// let newArrs3 = arrs3.filter(
//   (item, index, self) => self.indexOf(item) === index
// );
// console.log(newArrs3);
console.log("newArrs3");
let arrs3 = [6, 1, 2, 4, 3, 5, 3, 6];

let result = arrs3.filter((item, index, self) => {
  //   console.log(item, index, self);
  return self.indexOf(item) === index;
});
console.log(result);

let arrs4 = [
  { id: 1, name: "HTML5" },
  { id: 2, name: "JavaScript" },
  { id: null, name: "小程序" },
  { name: "NodeJS" },
  { id: 3, name: "VueJS" },
];

let newArrs6 = arrs4
  .filter((item) => item.id)
  .map((item) => ({ ...arrs4, author: "咸虾米" }));

console.log(newArrs6);
