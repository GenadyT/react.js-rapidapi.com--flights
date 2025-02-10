import './AirPortItem.css';


function AirPortItem({skyId, localizedName}) {
  return (
    <div className='airport-item'>
      <span className='airport-item-field'>
        {`${localizedName} (${skyId})`}
      </span>
    </div>
  );
}

export default AirPortItem;