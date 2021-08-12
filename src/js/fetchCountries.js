import countriesCardTpl from '../templates/countries-card.hbs';
import debounce from 'lodash.debounce';
import API from './api-service';
import getRefs from './get-refs';
import '@pnotify/core/dist/BrightTheme.css';
import pnotifyInfo from './pnotify';
import pnotifyError from './pnotify';

const { cardCountries, searchCountries } = getRefs();

function onSearch(evt) {
  searchCountries.innerHTML = '';
  const searchQuery = evt.target.value;

  API.fetchCountry(searchQuery)
    .then(country => {
      if (country.length <= 2 && country.length <= 10) {
        renderCountryCard(country);
        return;
      }
      if (country.length > 10) {
        pnotifyInfo();
        return;
      }
    })
    .catch(() => {
      searchCountries.innerHTML = '';
      pnotifyError();
    });
}

function renderCountryCard(country) {
  const markup = countriesCardTpl(country);
  cardCountries.innerHTML = markup;
}

//function callCountry(country) {
// if (country.length > 10) {
//   pnotifyInfo();
//   return;
// }
//  if (country.length <= 2 && country.length <= 10) {
//   renderCountryCard(country);
//   return;
// }
// renderCountryCard(country);
//}

searchCountries.addEventListener('input', debounce(onSearch, 500));
