import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
//import { FaSearch } from 'react-icons/fa';
import { getAirports } from '../../NavigateDataManager.js';
import AirPortItem from '../AirPortItem/AirPortItem.jsx';
import './AirPortSelect.css';
import '../ComponentsGlobalStyling.css';
import { NewYorkJohnFKennedyAirport } from '../../NavigateDataManager.js';


const ListboxContainer = styled.div`
  position: relative;
  display: inline-block;
`;

//padding: 8px;
const SearchBox = styled.input`
  box-sizing: border-box;
`;

const Listbox = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ccc;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;


const AirPortSelect = ({nearestIsLoaded, selectHandler}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const listBoxRef = useRef(null);

  useEffect(() => {   
    listBoxClose();

    if (nearestIsLoaded) {
      const selectedOption = NewYorkJohnFKennedyAirport();
      setSearchTerm(selectedOption);
      setSelectedOption(selectedOption);
      selectHandler(selectedOption);
    }    
  
    return () => {
      // Cleanup function (optional)
    };
  }, [nearestIsLoaded]);

  const listBoxOpen = () => {
    if (listBoxRef.current) {
      listBoxRef.current.style.display = "block";
    }
  };
  const listBoxClose = () => {
    if (listBoxRef.current) {
      listBoxRef.current.style.display = "none";
    }
  }; 

  function handleSearchBoxOnChange(searchValue) {
    listBoxOpen();    
    setSearchTerm(searchValue);
    setSelectedOption(null);
    getAirports(searchValue, (result)=>{
      setItems(()=>{ return result });
    })
    
  }

  function handleListItemOnClick(selectedOption) {
    listBoxClose();
    //setSelectedTerm(selectedOption);
    setSearchTerm(selectedOption);
    setSelectedOption(selectedOption);
    selectHandler(selectedOption);
  }

  function handleSearchBoxOnFocus() {
    listBoxOpen();
  }
  function handleSearchBoxOnBlur(event) {
    if (!(event.relatedTarget && event.relatedTarget.tabIndex === 0)) {
      listBoxClose(); 
      setSearchTerm(selectedOption);
    }
  }

  function handleListboxOnFocus() {
    listBoxOpen();
  }
  function handleListboxOnBlur() {
    listBoxClose();
  }

  return (
    
      <div className='filter-control-cont'>
        <label className='filter-control-caption'>to</label>
        <ListboxContainer className='airport-filter-field-cont'>      
          <SearchBox className='filter-field airport-filter-field'
            type="text"
            placeholder="Search Airport..."
            value={selectedOption ? `${selectedOption.localizedName} (${selectedOption.skyId})` : searchTerm}
            onChange={(e) => handleSearchBoxOnChange(e.target.value)}
            onFocus={handleSearchBoxOnFocus}        
            onBlur={(e) => handleSearchBoxOnBlur(e)}
          />      
          <Listbox className='airport-filter-field-list' onBlur={handleListboxOnBlur} onFocus={handleListboxOnFocus} ref={listBoxRef} tabIndex="0">
            {items &&
              items.map((item, index) => (
                <ListItem key={index} onClick={() => handleListItemOnClick(item)}>
                  <AirPortItem skyId={item.skyId} localizedName={item.localizedName} />
                </ListItem>
              ))
            }
          </Listbox>        
        </ListboxContainer>
      </div>          
   
  );
};

export default AirPortSelect;