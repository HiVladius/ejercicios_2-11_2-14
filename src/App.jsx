import React, { useState } from "react";
import Clima from "./components/clima";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  function handleSearch(event) {
    event.preventDefault();
    fetch(`https://restcountries.com/v3.1/name/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 10) {
          setCountries([]);
          setErrorMessage("Por favor, haz tu búsqueda más específica");
        } else if (data.length > 1) {
          setCountries(data);
          setErrorMessage("");
        } else if (data.length === 1) {
          setCountries(data);
          setErrorMessage("");
        } else {
          setCountries([]);
          setErrorMessage("No se encontraron resultados");
        }
      })
      .catch((error) => console.error(error));
  }

  function handleCountryClick(country) {
    setSelectedCountry(country);
  }

  function handleBackButtonClick() {
    setSelectedCountry(null);
  }

  return (
    
    <div>
      {selectedCountry ? (
        <div>
          <h2 class="bg-[#22d3ee] text-tahiti">{selectedCountry.name.common}</h2>
          {selectedCountry.flags && (
            <img src={selectedCountry.flags.png} alt={`${selectedCountry.name.common} flag`} />
          )}
          {selectedCountry.languages && (
            <p>Idiomas: {Object.values(selectedCountry.languages).join(", ")}</p>
          )}
          {selectedCountry.capital && <p>Capital: {selectedCountry.capital}</p>}
          {selectedCountry.population && <p>Población: {selectedCountry.population} millones</p>}
          <button onClick={handleBackButtonClick}>Volver a la lista de países</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSearch}>
            <label htmlFor="search-input">Buscar país:</label>
            <input
              type="text"
              id="search-input"
              name="search-input"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
          {countries.length > 0 &&
            countries.map((country) => (
              <div key={country.name.common}>
                <h2>
                  {country.name.common}
                  <button onClick={() => handleCountryClick(country)}>Ver detalle</button>
                </h2>
                {country.flags && (
                  <img src={country.flags.png} alt={`${country.name.common} flag`} />
                )}
                {country.languages && (
                  <ul>
                    {Object.values(country.languages).map((language) => (
                      <li key={language}>{language}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      )}
      /<Clima country={selectedCountry} />
    </div>
  );
}

export default App;
