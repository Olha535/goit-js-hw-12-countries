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
    // .then(resp => (resp.ok ? resp.json() : Promise.reject('is not ok: ' + resp.status)))
    //.catch(err => {
    // console.warn(err);
    //})
    //.then(resp => {
    //  if (!resp.ok) {
    //   throw Error(`is not ok: ` + resp.status);
    // }
    // return resp.json();
    // })
    // .catch(err => {
    //  console.warn(err);
    // })
    .then(country => {
      if (country.length > 10) {
        pnotifyInfo();
        return;
      }

      if (country.length >= 2 && country.length <= 10) {
        renderCountryList(country);
        return;
      }
      renderCountryCard(country);
      if (country.status === 404) {
        pnotifyNotice();
        return;
      }
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  searchCountries.innerHTML = '';
  pnotifyError();
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