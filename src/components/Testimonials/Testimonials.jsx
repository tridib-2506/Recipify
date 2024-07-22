import React, { forwardRef } from 'react'
import './testimonials.css';
import TestCard from './TestCard';
import image1 from '../../assets/shrutii.jpg'
import image2 from '../../assets/cat.png'

const carrd = [
  {
    id: 1,
    profilep: image1,
    profileName: 'Avinash Gupta',
    revieww: 'Recipify is my go-to for meal inspiration. The app makes it so easy to find new and exciting dishes to try. Highly recommend it to anyone who loves cooking!'
  },
  {
    id: 2,
    profilep: image2,
    profileName: 'Meow Nandi',
    revieww: 'Recipify is my go-to for meal inspiration. The app makes it so easy to find new and exciting dishes to try. Highly recommend it to anyone who loves cooking!'
  },
  {
    id: 3,
    profilep: image1,
    profileName: 'Aditya Chaplot',
    revieww: 'Recipify is my go-to for meal inspiration. The app makes it so easy to find new and exciting dishes to try. Highly recommend it to anyone who loves cooking!'
  },
]

const Testimonials = forwardRef((props, ref) => {
  return (
    <>
    <section ref={ref} id="testimonials">
    <div className='first'>
      <div className='header'>
        <div className='heading'>
          What do they say about us
        </div>
        <div className='tagline'>
          Check out the rave reviews- see why our app is winning hearts!
        </div>
      </div>
      <div className='holda'>
      {carrd.map((item) => (
          <TestCard
            key={item.id}
            profilep={item.profilep}
            profileName={item.profileName}
            revieww={item.revieww}
          />
        ))}

      </div>
    </div>
    </section>

    </>
  )
});

export default Testimonials