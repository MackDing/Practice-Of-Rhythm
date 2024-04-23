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
  countriesContainer.style.opacity = 1;
};

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
