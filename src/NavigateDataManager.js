import axios from "axios";

/*---------- RAPID_API -------------------*/
const RAPID_API_AJAX_HEADERS = {
  "x-rapidapi-host": 'sky-scrapper.p.rapidapi.com',
	"x-rapidapi-key": '5d8cb44016mshf90e4da0929eecdp1128c1jsn233537e47982'
}

const rapidApiUrl = function(endPoint, params) {
  const RAPID_API_BASE_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights';
  return `${RAPID_API_BASE_URL}/${endPoint}?${params}`;
}

const rapidApiAirportsRequestParams = function(airportIdentifier, locale='en-US') {
  return `query=${airportIdentifier}&locale=${locale}`;
}

const rapidApiNearByAirportsRequestParams = function(operateHandler, locale='en-US') 
{
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    let requestParams = `lat=${lat}&lng=${lng}&locale=${locale}`;
    operateHandler(requestParams);
  });
}

const rapidApiFlightsRequestParams = function(filterData) 
{
    return `originSkyId=${filterData.originSkyId}&destinationSkyId=${filterData.destinationSkyId}&originEntityId=${filterData.originEntityId}&destinationEntityId=${filterData.destinationEntityId}&date=${filterData.date}&returnDate=${filterData.returnDate}&cabinClass=${filterData.cabinClass}&adults=${filterData.adults}&sortBy=${filterData.sortBy}&currency=${filterData.currency}&market=${filterData.market}&countryCode=${filterData.countryCode}`;
}

const getRapidApiSimplifiedAirport = function(rawItem) {
  const item = rawItem.navigation.relevantFlightParams;
  return {
    skyId: item.skyId,
    entityId: item.entityId,
    localizedName: item.localizedName,
  }
}

const getRapidApiAirports = function(response) {
  if (response) {
    if (response.data) {
      if (response.data.data) {
        return response.data.data.map((item) => getRapidApiSimplifiedAirport(item));
      }
    }
  }
  return null;
}

const getRapidApiNearestAirport = function(response) {
  if (response) {
    if (response.data) {
      if (response.data.data) {
        if (response.data.data.current) {
          return getRapidApiSimplifiedAirport(response.data.data.current);
        }        
      }
    }
  }
  return null;
}

const getRapidApiSimplifiedFlight = function(rawItem) {
  const item = rawItem;
  return {...item};
}

const getRapidApiFlights = function(response) {
  if (response) {
    if (response.data) {
      if (response.data.data) {
        if (response.data.data.itineraries) {
          return response.data.data.itineraries.map((itinerary) => getRapidApiSimplifiedFlight(itinerary));
        }
      }
    }
  }
  return null;
}

export function NewYorkJohnFKennedyAirport() {
  return {
    entityId: '95565058',
    localizedName: 'New York John F. Kennedy',
    skyId: 'JFK'
  }
}
/*-----------------------------------------*/

/*--------- navigate data ------------------*/
const NAVIGATE_INITIAL_DATA = {  
  originSkyId: 'LOND',
  destinationSkyId: 'NYCA',
  originEntityId: '27544008',
  destinationEntityId: '27537542',
  date: getRapidApiDate(new Date()),
  returnDate: getRapidApiDate(new Date(), 7),
  cabinClass: 'economy',
  adults: 1,
  sortBy: 'best',
  currency: 'USD',
  market: 'en-US',
  countryCode: 'US'
}

export function getInitialNavigateData() {
  return cloneNavigateData(NAVIGATE_INITIAL_DATA);
}

export function getRapidApiDate(date, addDays=0) {
  if (addDays > 0) {
    date = addDaysToDate(date, addDays)
  }
  return date.toISOString().split('T')[0];
}

function addDaysToDate(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
/*-----------------------------------------*/

export function updateNavigateDataFilterInfoProps(propName, propValue, prevNavigateData) {
  const cloned = cloneNavigateData(prevNavigateData);  
  const filterInfo = cloned.filterInfo;

  filterInfo[propName] = propValue;  
  
  return cloned;
}

export function cloneNavigateData(prevFilterData) {
  return {...prevFilterData};
}

export function getAirports(airportIdentifier, ajaxHandler) {  
  const endPoint = 'searchAirport';

  const params = rapidApiAirportsRequestParams(airportIdentifier);
  const url = rapidApiUrl(endPoint, params);  
  const headers = RAPID_API_AJAX_HEADERS;  

  axios.get(url, {headers})
  .then(res => { 
    const readyArray = getRapidApiAirports(res);
    if (!readyArray) {
      //throw new Error('getAirports: res.data.data = undefined');
      console.log('getAirports: res.data.data = undefined');
    }
    ajaxHandler(readyArray);
  })
  .catch(function (error) {    
    //throw new Error('SERVER_ERROR');
    console.log('getAirports: ' + error);
    ajaxHandler(null);
  });
}

export function getNearByAirports(ajaxHandler) {  
  const endPoint = 'getNearByAirports';  
  const headers = RAPID_API_AJAX_HEADERS;  

  rapidApiNearByAirportsRequestParams((params) => {
    const url = rapidApiUrl(endPoint, params);  
    
    axios.get(url, {headers})
    .then(res => { 
      const nearestAirport = getRapidApiNearestAirport(res);
      if (!nearestAirport) {
        //throw new Error('getNearByAirports: res.data.data = undefined');
        console.log('getNearByAirports: res.data.data = undefined');
      }
      ajaxHandler(nearestAirport);
    })
    .catch(function (error) {    
      //throw new Error('SERVER_ERROR');
      console.log('getNearByAirports: ' + error);
      ajaxHandler(null);
    });
  });
}

export function getFlights(filterData, ajaxHandler) {
  const endPoint = 'searchFlights';

  const params = rapidApiFlightsRequestParams(filterData);
  const url = rapidApiUrl(endPoint, params);  
  const headers = RAPID_API_AJAX_HEADERS;  

  axios.get(url, {headers})
  .then(res => { 
    const readyArray = getRapidApiFlights(res);
    if (!readyArray) {
      //throw new Error('getFlights: res.data.data = undefined');
      console.log('getFlights: res.data.data = undefined');
    }
    ajaxHandler(readyArray);
  })
  .catch(function (error) {    
    //throw new Error('SERVER_ERROR');
    console.log(`getFlights: ${error}`);
    ajaxHandler(null);
  });
}