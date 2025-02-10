import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { getRapidApiDate } from "../../NavigateDataManager";
import './FlihgtDate.css';

import "react-datepicker/dist/react-datepicker.css";
import '../ComponentsGlobalStyling.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const FlihgtDate = ({fromTo, selectHandler}) => {
  const [startDate, setStartDate] = useState(getRapidApiDate(new Date(), (fromTo === 'to') ? 7 : 0));  

  function handleSelet(date) {
    selectHandler(getRapidApiDate(date), fromTo);
    setStartDate(date);
  }

  return (
    <div className='filter-control-cont filter-control-date-cont'>
      <label className='filter-control-caption'>{fromTo}</label>
      <DatePicker className='filter-field date-filter-field' selected={startDate} onChange={(date) => handleSelet(date)} />
    </div>   
  );  
};

export default FlihgtDate;