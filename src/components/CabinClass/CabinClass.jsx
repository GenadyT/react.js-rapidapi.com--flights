import { useState } from 'react';
import './CabinClass.css';
import '../ComponentsGlobalStyling.css';

const cabinClasses = ['economy', 'premium_economy', 'business', 'first'];

function CabinClass({selectHandler}) {
  const [cabinClassState, setCabinClassState] = useState('economy');  

  function handleOnSelect(cabinClass) {
    selectHandler(cabinClass);
    setCabinClassState(cabinClass);
  }


  return (
    
    <div className='filter-control-cont'>
      <label className='filter-control-caption'>cabin class</label>
      <select className='filter-field cabin-class-filter-field' onChange={(e) => handleOnSelect(e.target.value)}>
        {
          cabinClasses.map((cabinClass) => 
            <option className="filter-select-option cabin-class" value={cabinClass} selected={cabinClass===cabinClassState}>          
              {cabinClass}
            </option>
          )
        }        
      </select>
    </div>        
    
  );
}

export default CabinClass;
