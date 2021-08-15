import countriesCardTpl from '../templates/countries-card.hbs';
import countriesListTpl from '../templates/countries-list.hbs';
import debounce from 'lodash.debounce';
import API from './api-service';
import getRefs from './get-refs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import { pnotifyInfo, pnotifyError, pnotifyNotice } from './pnotify';

const { cardCountries, searchCountries } = getRefs();

function onSearch(evt) {
  cardCountries.innerHTML = '';
  evt.preventDefault();
  const searchQuery = evt.target.value;

  API.fetchCountry(searchQuery)
    .then(country => {
      if (country.length > 10) {
        pnotifyInfo();
        return;
      }
      if (country.status === 404) {
        pnotifyNotice();
      }
      if (country.length >= 2 && country.length <= 10) {
        renderCountryList(country);
        return;
      }
      renderCountryCard(country);
    })
    .catch(Error => {
      Error.pnotifyError();
    });
}

function renderCountryCard(country) {
  const markup = countriesCardTpl(country);
  cardCountries.innerHTML = markup;
}

function renderCountryList(country) {
  const markupList = countriesListTpl(country);
  cardCountries.innerHTML = markupList;
}

searchCountries.addEventListener('input', debounce(onSearch, 500));
