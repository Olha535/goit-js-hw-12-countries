const fetchCountries = fetch('https://restcountries.eu/rest/v2/name/eesti')
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
  })
  .catch(error => {
    console.log(error);
  });
