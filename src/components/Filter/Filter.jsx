import './Filter.css';
import NearestAirPortSelect from '../NearestAirPortSelect/NearestAirPortSelect.jsx';
import AirPortSelect from '../AirPortSelect/AirPortSelect.jsx';
import FlihgtDate from '../FlihgtDate/FlihgtDate.jsx';
import PlusMinus from '../PlusMinus/PlusMinus.jsx';
import CabinClass from '../CabinClass/CabinClass.jsx';

import { useRef, useState } from 'react';
import { getInitialNavigateData } from '../../NavigateDataManager.js';

function Filter({changeHandler}) {
  const filterInfo = useRef(getInitialNavigateData());
  const [nearestIsLoaded, setNearestIsLoaded] = useState(false);

  function handleOriginAirport(selectedItem) {
    filterInfo.current.originSkyId = selectedItem.skyId;
    filterInfo.current.originEntityId = selectedItem.entityId;
    setNearestIsLoaded(true);
  }
  
  function handleAirport(selectedItem) {
    filterInfo.current.destinationSkyId = selectedItem.skyId;
    filterInfo.current.destinationEntityId = selectedItem.entityId;

    changeHandler(filterInfo.current);
  } 

  function handleFlihgtDate(date, fromTo) {
    if (fromTo === 'from') {
      filterInfo.current.date = date;
    } else {
      filterInfo.current.returnDate = date;
    }

    changeHandler(filterInfo.current);
  }

  function adultsChangeHandler(number) {
    filterInfo.current.adults = number;
    changeHandler(filterInfo.current);
  }

  function handleCabinClassSelect(cabinClass) {
    filterInfo.current.cabinClass = cabinClass;
    changeHandler(filterInfo.current);
  }

  return (
    <div className='filter flight-filter'>      
      <NearestAirPortSelect selectHandler={handleOriginAirport} />
      <AirPortSelect nearestIsLoaded={nearestIsLoaded} selectHandler={handleAirport} />    
      <FlihgtDate fromTo='from' selectHandler={handleFlihgtDate} />
      <FlihgtDate fromTo='to' selectHandler={handleFlihgtDate} />
      <PlusMinus min={1} onChangeHandler={adultsChangeHandler} />
      <CabinClass selectHandler={handleCabinClassSelect} />
    </div>    
  );
}

export default Filter;