import fetchCountries from './fetchCountries.js';
const debounce = require('lodash.debounce');

const refs = {
  inputCountries: document.querySelector('.js-input'),
  listContries: document.querySelector('.js-country'),
};

refs.inputCountries.addEventListener('input', debounce(inputCountries, 500));

function inputCountries(e) {
  refs.listContries.innerHTML = '';
  fetchCountries(e.target.value).then(countries => {
    console.log(countries.length);
    if (countries.length >= 2 && countries.length <= 10) {
      const list = countries
        .map(countrie => {
          return `<li>${countrie.name}</li>`;
        })
        .join('');
      console.log(list);
      refs.listContries.innerHTML = list;
    }
  });
}
