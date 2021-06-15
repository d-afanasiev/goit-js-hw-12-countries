export default function fetchCountries(searchQuery) {
  const fetchContries = fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`);
  return fetchContries.then(contries => contries.json()).catch(error => console.log(error));
}
