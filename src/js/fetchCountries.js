export default function fetchCountries(searchQuery) {
  const fetchContries = fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`);
  return fetchContries.then(contries => {
    if (!contries.ok) {
      throw new Error(contries.status);
    }
    return contries.json();
  });
}
