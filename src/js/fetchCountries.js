import countriesCardTpl from '../templates/countries-card.hbs';
import debounce from 'lodash.debounce';
import API from './api-service';
import getRefs from './get-refs';

const refs = getRefs();

function onSearch(evt) {
  searchCountries.innerHTML = '';
  const searchQuery = evt.target.value;
}

API.fetchCountry(searchQuery)
  .then(renderCountryCard)
  .catch(error => console.log(error));

function renderCountryCard(country) {
  const markup = countriesCardTpl(country);
  refs.cardCountries.innerHTML = markup;
}

input.addEventListener('input', debounce(onSearch, 500));
