import './Main.css';
import { useState } from 'react';
import styled from 'styled-components';
import { getFlights } from '../../NavigateDataManager.js';
import Filter from '../Filter/Filter.jsx';
import FlightList from '../FlightList/FlightList.jsx';

const ResultState = styled.span`
  display: block;
    font-size: 0.9rem;
    margin-top: 6rem;
    color: #000052;
`;

export default function Main() {
  const [flights, setFlights] = useState(null);  

  const digUI = function() {
    // do nothing for now
    return true;
  }  

  function handleFilterChange(filterData) {
    digUI();     
    setFlights(null);
    
    getFlights(filterData, (flights) => {
      if (flights) {
        setFlights(flights);
      } else {
        setFlights([]);
      }
    });
  }

  return (
    <div className="App">
      <Filter changeHandler={handleFilterChange} />

      {!flights &&
        <ResultState>Fetching data, please wait...</ResultState>
      }
      {flights && flights.length === 0 &&
        <ResultState>Oops! No flights found for your search.</ResultState>
      }
      {flights && flights.length > 0 &&
        <FlightList flights={flights} />
      }      
    </div>
  );
}