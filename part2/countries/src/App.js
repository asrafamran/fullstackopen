import { useState, useEffect } from "react";
import countriesService from "./services/countries";

// require("dotenv").config();

const ShowCountry = ({ countries, countrySelect, weather }) => {
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

      <h2>Weather in {country.capital}</h2>
      {weather && (
        <>
          <p>Temperature {weather.main["temp"]}</p>
          <img
            src={
              `https://openweathermap.org/img/wn/` +
              weather.weather[0]["icon"] +
              "@2x.png"
            }
            alt={weather.weather[0]["icon"]}
          />
          <p>wind {weather.wind["speed"]} m/s</p>
        </>
      )}
    </>
  );
};

function App() {
  const [search, setSearch] = useState(null);
  const [countries, setCountries] = useState([]);
  const [showDetail, setShowDetail] = useState(null);
  const [weather, setWeather] = useState(null);

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
    const country = countries.find((c, index) => c.name.official === name);
    getWeather(country.latlng[0], country.latlng[1]);
  };

  const getWeather = (lat, lang) => {
    countriesService.getWeather(lat, lang).then((res) => setWeather(res.data));
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
              !showDetail && (
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

                  <h2>Weather in {country.capital}</h2>
                  {weather && (
                    <>
                      <p>Temperature {weather.main["temp"]}</p>
                      <img
                        src={
                          `https://openweathermap.org/img/wn/` +
                          weather.weather[0]["icon"] +
                          "@2x.png"
                        }
                        alt={weather.weather[0]["icon"]}
                      />
                      <p>wind {weather.wind["speed"]} m/s</p>
                    </>
                  )}
                </>
              )
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
        <ShowCountry
          countries={countries}
          countrySelect={showDetail}
          weather={weather}
        />
      )}
    </div>
  );
}

export default App;
