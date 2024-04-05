// let arrs1 = [...Array(9999999).keys()];
// console.log(arrs1);
// let total1 = 0;
// let startTime1 = Date.now();
// for (let i = 0; i < arrs1.length; i++) total1 += i;
// let endTime1 = Date.now();
// let countTime1 = endTime1 - startTime1;
// console.log("计数---->" + total1);
// console.log("消耗时间---->" + countTime1);

// let arrs2 = [...Array(9999999).keys()];
// let total2 = 0;
// let startTime2 = Date.now();
// arrs2.forEach((item) => {
//   total2 += item;
// });
// let endTime2 = Date.now();
// let countTime2 = endTime2 - startTime2;
// console.log("计数---->" + total2);
// console.log("消耗时间---->" + countTime2);

let arrs3 = [3, 1, 2, 3, 4];
let newArrs1 = [];
for (arr3 of arrs3) {
  newArrs1.push(arr3 * 2);
}
console.log(newArrs1);

console.log("This is map(item, index, array) " + "-".repeat(11));
arrs3.map((item, index, array) => console.log(item, index, array));

let newArrs2 = arrs3.map((item) => item * 2);
console.log(newArrs2);

let newArrs3 = arrs3.map((item) => item);
console.log(newArrs3);
console.log("This is reduce(item, index, array) " + "-".repeat(11));
arrs3.reduce((item, index, array) => console.log(item, index, array));



let arrs = [
  { name: "华为", price: 6999 },
  { name: "苹果", price: 9888 },
  { name: "小米", price: 4999 },
];

let newArrs4 = arrs.map((item) => item.name);
console.log(newArrs4);

let newArrs5 = arrs.map((item) => ({
  ...item,
  price: item.price + " RMB",
  number: 888,
}));
console.log(newArrs5);

let arrs1 = [
  { key: 0, content: "篮球" },
  { key: 1, content: "足球" },
  { key: 2, content: "排球" },
];
let newArrs6 = arrs1.map(({ key, content }) => ({ value: key, text: content }));
console.log(newArrs6);

// async function fetchData() {
// 	let arrs = Array.from({length:3},(_,index)=>index+1);
// 	let datas=[];
// 	for (let i = 0; i < arrs.length; i++) {
// 		const {data} = await uni.request({
// 			url:"http://jsonplaceholder.typicode.com/posts/"+arrs[i]
// 		});
// 		datas.push(data);
// 	}
// 	console.log(datas);
// }
// fetchData();

