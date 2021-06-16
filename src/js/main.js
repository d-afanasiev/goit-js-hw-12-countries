import fetchCountries from './fetchCountries.js';
const debounce = require('lodash.debounce');

const refs = {
  inputCountries: document.querySelector('.js-input'),
  insertList: document.querySelector('.js-list'),
};

refs.inputCountries.addEventListener('input', debounce(inputCountries, 500));

function inputCountries(e) {
  refs.insertList.innerHTML = '';
  fetchCountries(e.target.value).then(countries => {
    console.log(countries.length);
    if (countries.length >= 2 && countries.length <= 10) {
      const list = countries
        .map(countrie => {
          return `<li>${countrie.name}</li>`;
        })
        .join('');
      refs.insertList.innerHTML = `<ul class="js-country">${list}</ul>`;
    }
  });
}
