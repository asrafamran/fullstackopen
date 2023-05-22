import { useState, useEffect } from "react";
import countriesService from "./services/countries";

function App() {
  const [search, setSearch] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countriesService
      .getAll()
      .then((res) => {
        console.log(res.data);
        const countryList = res.data;
        return countryList;
      })
      .then((countryList) => setCountries(countryList))
      .then(console.log(countries));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      find countries <input onChange={(e) => handleSearch(e)} />
      {countries.filter((country) =>
        country.name.official.toLowerCase().includes(search)
      ).length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        countries
          .filter((country) =>
            country.name.official.toLowerCase().includes(search)
          )
          .map((country, i) => {
            return <p key={i}>{country.name.official}</p>;
          })
      )}
    </div>
  );
}

export default App;
