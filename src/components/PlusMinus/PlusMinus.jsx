import { useState } from 'react';
import './PlusMinus.css';
import '../ComponentsGlobalStyling.css';


function PlusMinus({name, min, onChangeHandler}) {
  const [currentValue, setCurrentValue] = useState(min);  

  const inputId = `filterPlusMinusId_${name}`; 

  function handleOnChange(value) {
    const iValue = parseInt(value);
    setCurrentValue(iValue);
    onChangeHandler(iValue);
  }

  return (    
    <div className='filter-field filter-control-cont plus-minus-control-cont'>
      <label className='filter-control-caption plus-minus-control-caption'>adults</label>
      <input className='plus-minus-filter-field' id={inputId} type="range" min={min} max="8" value={currentValue} step="1" 
        oninput="output.value = rangeInput.value" onInput={(e) => handleOnChange(e.target.value)}></input>
      <output for={inputId}>{currentValue}</output>  
    </div>        
    
  );
}

export default PlusMinus;
