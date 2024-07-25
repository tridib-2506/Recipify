import React from 'react'
import './popRec.css';

const RepCard = ({recImage, dishName, prepTime, cookTime, stars, recLink}) => {

  const handleCardClick = () => {
    window.open(recLink, '_blank');
  };

  return (
    <div className='recard' onClick={handleCardClick} style={{ backgroundImage: `url(${recImage})` }}>
        
        <div className='conCard' >
            <div className='dishname'>{dishName}</div>
            <div className='time'>{prepTime}</div>
            <div className='time'>{cookTime}</div>
            <div className='stars'>{stars}</div>
        </div>
        
    </div>
  )
}

export default RepCard