import debounce from 'lodash.debounce';

import { error } from '@pnotify/core';
import * as PNotifyAnimate from '@pnotify/animate';
import { defaults } from '@pnotify/animate';
defaults.inClass = 'fadeInDown';
defaults.outClass = 'fadeOutUp';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

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
  fetchCountries(e.target.value.trim())
    .then(countries => {
      if (e.target.value.trim() === '') {
        return;
      }
      if (countries.length === 1) {
        refs.insertList.innerHTML = cardTemplate(countries);
      } else if (countries.length >= 2 && countries.length <= 10) {
        refs.insertList.innerHTML = cardsTemplate(countries);
      } else if (countries.length > 10) {
        errorMessage('Too many matches found. Please enter a more specific query!');
      } else if (countries.status === 404) {
        errorMessage('No country has been found. Please enter a more specific query!');
      }
    })
    .catch(() => errorMessage('No country has been found. Please enter a more specific query!'));
}

function errorMessage(message) {
  error({
    text: `${message}`,
  });
}
