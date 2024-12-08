import React,{ useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoAPIOptions } from "../../api";

export function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  function loadCityOptions(inputValue) {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoAPIOptions
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        return {
          options: response.data.map(function(city) {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function handleOnChange(searchData) {
    setSearch(searchData);
    onSearchChange(searchData);
  }
  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadCityOptions}
    ></AsyncPaginate>
  );
}
