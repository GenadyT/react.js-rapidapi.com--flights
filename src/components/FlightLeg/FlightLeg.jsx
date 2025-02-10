import '../Flight/Flight.css';
import './FlightLeg.css'

function FlightLeg({legIndex, legData}) {
  return (
    <section className='flight-leg'>
      <h4 className='flight-leg-header'>
        <span className='leg-index'>{`leg-${legIndex} ->`}</span>
        <div className='flight-leg-header-field'>
          <label>departure:</label>
          <span>{legData.departure}</span>
        </div>                
        <div className='flight-leg-header-field'>
          <label>arrival:</label>
          <span>{legData.arrival}</span>
        </div>        
      </h4>
      <div className='flight-leg-body'>
        <section className='origin-destination-sec origin-sec'>
          <h4 className='leg-section-header leg-origin-section-header'>leg origin:</h4>
          <div className='origin-destination-sec-body'>
            <div className='flight-leg-body-field'>
              <label>id:</label>
              <span>{legData.origin.id}</span>
            </div>
            <div className='flight-leg-body-field'>
              <label>city:</label>
              <span>{legData.origin.city}</span>
            </div>
            <div className='flight-leg-body-field'>
              <label>country:</label>
              <span>{legData.origin.country}</span>
            </div>
          </div>
        </section>
        <section className='origin-destination-sec destination-sec'>
          <h4 className='leg-section-header leg-destination-section-header'>leg destination:</h4>
          <div className='origin-destination-sec-body'>
            <div className='flight-leg-body-field'>
              <label>id:</label>
              <span>{legData.destination.id}</span>
            </div>
            <div className='flight-leg-body-field'>
              <label>city:</label>
              <span>{legData.destination.city}</span>
            </div>
            <div className='flight-leg-body-field'>
              <label>country:</label>
              <span>{legData.destination.country}</span>
            </div>
          </div>
        </section>
      </div>      
    </section>
  );
}

export default FlightLeg;