import './Flight.css';
import FlightLeg from '../FlightLeg/FlightLeg';

function Flight({flightInfo}) {
  return (
    <section className="flight">
      <h3 className='flight-header'>
        <div className='flight-field flight-id-field'>
          <label className='flight-id-label'>flight id:</label>
          <span className='flight-id-span'>{flightInfo.id}</span>
        </div>
        <div className='flight-field flight-price-field'>
          <label>price:</label>          
          <span>{flightInfo.price.formatted}</span>
        </div>
      </h3>
      <div className='flight-legs-cont'>
        <ul className='flights-legs-ul'>
          {flightInfo.legs.map((flightLeg, index) => (
            <li key={index}>              
              <FlightLeg legIndex={index+1} legData={flightLeg} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Flight;
