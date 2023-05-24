import { useState, useEffect } from "react";
import countriesService from "./services/countries";

const ShowCountry = ({ countries, countrySelect }) => {
  const country = countries.find(
    (c, index) => c.name.official === countrySelect
  );
  return (
    <>
      <h1>{country.name.official}</h1>
      <br />
      {country.capital.map((capital, i) => {
        return <p key={i}>{capital}</p>;
      })}
      <p>{country.area}</p>
      <br />
      <p>
        <b>languges:</b>
      </p>
      <ul>
        {Object.keys(country.languages).map((key, value) => {
          return <li key={value}>{country.languages[key]}</li>;
        })}
      </ul>
      <img src={country.flags["png"]} alt={country.flags["alt"]} />
    </>
  );
};

function App() {
  const [search, setSearch] = useState(null);
  const [countries, setCountries] = useState([]);
  const [showDetail, setShowDetail] = useState(null);

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
    setShowDetail(null);
  };

  const handleDetails = (name) => {
    setShowDetail(name);
  };

  return (
    <div className="App">
      find countries <input onChange={(e) => handleSearch(e)} />
      {countries &&
      countries.filter((country) =>
        country.name.official.toLowerCase().includes(search)
      ).length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.filter((country) =>
          country.name.official.toLowerCase().includes(search)
        ).length === 1 ? (
        countries
          .filter((country) =>
            country.name.official.toLowerCase().includes(search)
          )
          .map((country) => {
            return (
              <>
                <h1>{country.name.official}</h1>
                <br />
                {country.capital.map((capital, i) => {
                  return <p key={i}>{capital}</p>;
                })}
                <p>{country.area}</p>
                <br />
                <p>
                  <b>languges:</b>
                </p>
                <ul>
                  {Object.keys(country.languages).map((key, value) => {
                    return <li>{country.languages[key]}</li>;
                  })}
                </ul>
                <img src={country.flags["png"]} alt={country.flags["alt"]} />
              </>
            );
          })
      ) : (
        countries
          .filter((country) =>
            country.name.official.toLowerCase().includes(search)
          )
          .map((country, i) => {
            return (
              <div key={i}>
                <p>
                  {country.name.official}{" "}
                  <button onClick={() => handleDetails(country.name.official)}>
                    show
                  </button>
                </p>
              </div>
            );
          })
      )}
      {showDetail && (
        <ShowCountry countries={countries} countrySelect={showDetail} />
      )}
    </div>
  );
}

export default App;
