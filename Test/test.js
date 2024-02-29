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


// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.23, 100));

const addVAT = addTax.bind(null, 0.23);
//addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const AddVAT2 = addTaxRate(0.23);
console.log(AddVAT2(100));


const addTaxRate1 = rate => value => value + value * rate;
const AddVAT3 = addTaxRate1(0.23);
console.log(AddVAT3(100));