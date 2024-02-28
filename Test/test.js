// passing by value
function update(b) {
  b = 30;
}

let a = 10;
update(a);
console.log(a); // 输出：10

// passing by reference
function update(obj) {
  obj.name = "Mack";
}

let personal = { name: "John Doe" };
update(personal);
console.log(personal.name); // 输出："Mack"
console.log(personal);
