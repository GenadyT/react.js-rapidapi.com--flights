import { useState, useEffect } from 'react';
import './NearestAirPortSelect.css';
import '../ComponentsGlobalStyling.css';
import { getNearByAirports } from '../../NavigateDataManager';


function NearestAirPortSelect({selectHandler}) {
  const [nearestAirPort, setNearestAirPort] = useState(null);

  useEffect(() => {   
    getNearByAirports((airportsData) => {
      selectHandler(airportsData);
      setNearestAirPort(airportsData);
    });
  
    return () => {
      // Cleanup function (optional)
    };
  }, []);

  function handleOnSelect(selectedAirport) {
    selectHandler(selectedAirport);
  }


  return (
    
    <div className='filter-control-cont filter-control-nearest-airPort-cont'>
      <label className='filter-control-caption'>from</label>
      <select className='filter-field airport-filter-field nearest-airport-filter-field' onSelect={handleOnSelect}>
        {nearestAirPort &&        
          <option className="filter-select-option airport-item" value={nearestAirPort} selected='true'>          
            {`${nearestAirPort.localizedName} (${nearestAirPort.skyId})`}
          </option>
        }
      </select>
    </div>        
    
  );
}

export default NearestAirPortSelect;
