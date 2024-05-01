const { value } = require('jsonpath');

// 静态方法
function ajax(url) {}

// Promise.resolve('foo').then(function (value) {
//   console.log(value);
// });

// new Promise(function (resolve, reject) {
//   resolve('foo');
// });

// var promise = ajax('/api/users.json');
// var promise2 = Promise.resolve(promise);
// console.log(promise === promise2);

// Promise.resolve({
//   then: function (onFulfilled, onRejected) {
//     onFulfilled('foo');
//   },
// }).then(function (value) {
//   console.log(value);
// });

// Promise.reject(new Error('anything')).catch(function (error) {
//   console.log(error);
// });

// Promise.reject('anything').catch(function (error) {
//   console.log(error);
// });

// Promise.all

// ajax('/api/users.json');
// ajax('/api/posts.json');

// var promise = Promise.all([ajax('/api/users.json'), ajax('/api/posts.json')]);

// promise
//   .then(function (values) {
//     console.log(values);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// ajax('/api/urls.json')
//   .then(value => {
//     const urls = Object.values(value);
//     const tasks = urls.map(url => ajax(url));
//     return Promise.all(tasks);
//   })
//   .then(values => {
//     console.log(values);
//   });

// Promise.race

// const request = ajax('/api/posts.json');
// const timeout = new Promise((resolve, reject) => {
//   setTimeout(() => reject(new Error('timeout')), 500);
// });

// Promise.race([request, timeout])
//   .then(value => {
//     console.log(value);
//   })
//   .catch(timeout => {
//     console.log(timeout);
//   });

// console.log('global start');
// setTimeout(() => {
//   console.log('setTimeOut'), 0;
// });

// Promise.resolve()
//   .then(() => console.log('promise1'))
//   .then(() => console.log('promise2'))
//   .then(() => console.log('promise3'));

// console.log('global end');

// function* foo() {
//   console.log('start');

//   try {
//     const res = yield 'foo';
//     console.log(res);
//   } catch (e) {
//     console.log(e);
//   }
// }

// const generator = foo();

// const result = generator.next();
// console.log(result);

// // console.log(generator.next('bar'));

// generator.throw(new Error('Generator error'));

async function main() {
  try {
    const users = await ajax('/api/users.json');
    console.log(users);

    const posts = await ajax('/api/posts.json');
    console.log(posts);

    const urls = await ajax('/api/urls.json');
    console.log(urls);
  } catch (err) {
    console.log(err);
  }
}

const promise = main();

promise.then(() => console.log('all completed'));

// const g = main();

// https://github.com/tj/co
// function co(generator) {
//   const g = generator();

//   function handleResult(result) {
//     if (!result.done) {
//       result.value
//         .then(data => handleResult(g.next(data))) //Resolve the promise
//         .catch(err => handleResult(g.throw(err))); //Handle any errors thrown by the promise
//     }
//   }

//   //In case generator throws an error that's not caught
//   try {
//     handleResult(g.next());
//   } catch (err) {
//     console.error(err);
//   }
// }

// co(main);

// const result = g.next();
// console.log(result);

// result.value.then(data => {
//   const result2 = g.next(data);
//   if (result2.done) return;
//   result2.value.then(data => {
//     const result3 = g.next(data);
//     if (result3.done) return;
//     result3.value.then(data => {
//       g.next(data);
//     });
//   });
// });
