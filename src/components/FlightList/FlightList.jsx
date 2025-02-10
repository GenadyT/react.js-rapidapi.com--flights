import './FlightList.css';
import Flight from '../Flight/Flight';


function FlightList({flights}) {

  return (
    <ul className='flights-ul'>
      {flights.map((flightInfo, index) => (
        <li key={index}>
          <Flight flightInfo={flightInfo}/>
        </li>
      ))}
    </ul>
  );
}

export default FlightList;