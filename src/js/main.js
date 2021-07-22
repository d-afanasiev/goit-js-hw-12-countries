import debounce from 'lodash.debounce';

import { Notify } from 'notiflix';

import cardsTemplate from '../partials/cards.hbs';
import cardTemplate from '../partials/card.hbs';
import fetchCountries from './fetchCountries.js';

const refs = {
  inputCountries: document.querySelector('.js-input'),
  insertList: document.querySelector('.js-list'),
};

refs.inputCountries.addEventListener('input', debounce(inputCountries, 500));

function inputCountries(e) {
  refs.insertList.innerHTML = '';
  if (
    e.target.value.trim() === '' ||
    e.inputType === 'deleteContentBackward' ||
    e.inputType === 'deleteContentForward'
  ) {
    return;
  }

  fetchCountries(e.target.value.trim())
    .then(countries => {
      if (countries.length === 1) {
        refs.insertList.innerHTML = cardTemplate(countries);
      } else if (countries.length >= 2 && countries.length <= 10) {
        refs.insertList.innerHTML = cardsTemplate(countries);
      } else if (countries.length > 10) {
        infoMessage('Too many matches found. Please enter a more specific query!');
      }
    })
    .catch(() => errorMessage('Oops, there is no country with that name'));
}

function infoMessage(message) {
  Notify.info(message);
}

function errorMessage(message) {
  Notify.failure(message);
}
