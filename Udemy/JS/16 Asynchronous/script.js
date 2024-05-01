'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/* https://restcountries.com/
https://restcountries.com/v3.1/all


https://restcountries.com/v3.1/name/eesti
https://restcountries.com/v3.1/name/deutschland


https://restcountries.com/v3.1/name/{name}?fullText=true
https://restcountries.com/v3.1/name/aruba?fullText=true 

https://restcountries.com/v3.1/alpha/{code}
https://restcountries.com/v3.1/alpha/co
https://restcountries.com/v3.1/alpha/col
https://restcountries.com/v3.1/alpha/170
*/

const renderCountry = function (data, className = '') {
  const html = `
<article class="country ${className}">
<img class="country__img" src="${data.flags?.svg}" />
<div class="country__data">
  <h3 class="country__name">${data.name?.common}</h3>
  <h4 class="country__region">${data?.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )} people</p>
  <p class="country__row"><span>🗣️</span>${data.languages?.eng}</p>
  <p class="country__row"><span>💰</span>${data.currencies?.USD?.name}</p>
</div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

/* 
// Our First AJAX Call: XMLHttpRequest
const getCountryAndNeighbor = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  request.send();
  // console.log(request.responseText);

  // AJAX call country 1
  request.addEventListener('load', function () {
    // console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);

    console.log(data);
    // Render Country 1
    renderCountry(data);

    // Get neighbor country (2)
    const [neighbor] = data.borders;

    if (!neighbor) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      //   console.log(this.responseText);
      const data2 = JSON.parse(this.responseText);
      //   console.log(data2);

      renderCountry(data2, 'neighbor');
    });
  });
};

// getCountryAndNeighbor('portugal');
getCountryAndNeighbor('usa');
 */

/* 
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
        setTimeout(() => {
          console.log('5 second passed');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
 */

// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

// const getCountryData = function (country) {
//   // fetch country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       const countryData = data[0];

//       renderCountry(countryData);

//       const neighbor = countryData.borders && countryData.borders[0];
//       if (!neighbor) return;

//       // fetch country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbor'))
//     // .catch(err => alert(err));
//     .catch(err => {
//       console.log(`${err} 💥💥💥`);
//       renderError(
//         `Something went wrong with neighbor country ${err.message}. Try again!`
//       );
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData('portugal');
/* 
const getCountryData = function (country) {
  // fetch country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];

      if (!neighbor) throw new Error('No neighbor found!');

      // fetch country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbor'))
    // .catch(err => alert(err));
    .catch(err => {
      console.log(`${err} 💥💥💥`);
      renderError(
        `Something went wrong with neighbor country ${err.message}. Try again!`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

getCountryData('usaa');
 */

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

https://geocode.xyz/
GOOD LUCK 😀
*/
/* 
const whereAmI = function (lat, lng) {
  const apiUrl = `https://geocode.xyz/${lat},${lng}?geoit=json`;

  if (typeof lat !== 'number' || isNaN(lat)) {
    throw new Error('Invalid latitude');
  }
  if (typeof lng !== 'number' || isNaN(lng)) {
    throw new Error('Invalid longitude');
  }

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data) {
        throw new Error('Data is null');
      }
      if (!data.city || !data.country) {
        throw new Error('Missing city or country');
      }

      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data || data.length !== 1) {
        throw new Error('Invalid data from countries API');
      }

      renderCountry(data[0]);
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

// Example usage
whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
 */

/* 
console.log('Test start');
setTimeout(() => {
  console.log('0 sec timer');
}, 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
// “Test start” -> "Test end" -> "Resolved promise 1" -> "0 sec timer"

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end');
 */

/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🎰');
    } else {
      reject(new Error('You lost 🧘‍♀️🧘‍♀️🧘‍♀️🧘‍♀'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('5 second passed');
    return wait(1);
  })
  .then(() => console.log('6 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//         setTimeout(() => {
//           console.log('5 second passed');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('problem!')).catch(x => console.error(x));
console.log(x);
*/

// console.log('Getting position');

<<<<<<< Updated upstream
// getPosition().then(pos => console.log(pos));
/* 
=======
const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
/* 
getPosition().then(pos => console.log(pos));
>>>>>>> Stashed changes
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

<<<<<<< Updated upstream
btn.addEventListener('click', whereAmI);
 */

const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async country => {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    console.log(lat, lng);
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    console.log(`resGeo:${resGeo}`);
    const dataGeo = await resGeo.json();
    console.log(`this is: ${dataGeo}`);
    console.log(dataGeo.country);
    // Country
    // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res =>
    //   console.log(res)
    // );
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    console.log(err);
    renderError(`Something went wrong 💥 ${err.message}`);
  }
};

whereAmI();
console.log('FIRST');

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (error) {
//   alert(error.message);
// }
=======
btn.addEventListener('click', whereAmI); */

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
/* 
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.log(err));
 */

const whereAmI = async function (country) {
  
};
>>>>>>> Stashed changes
