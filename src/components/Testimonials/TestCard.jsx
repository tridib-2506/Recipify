import React from 'react'
import './testimonials.css';

const TestCard = ({ profilep, profileName, revieww }) => {
    return (
      <div className='card'>
        <img src={profilep} alt={`${profileName}'s profile`} className='profilepic' />
        <div className='name'>{profileName}</div>
        <div className='review'>{revieww}</div>
      </div>
    );
  };

export default TestCard