import React, { forwardRef } from 'react'
import './testimonials.css';
import TestCard from './TestCard';
import image1 from '../../assets/cat.png'
import image2 from '../../assets/cat2.png'
import image3 from '../../assets/cat3.png'

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
    profileName: 'Anushka Bisht',
    revieww: 'Fantastic app! Recipify helps me make the most of what I have in the kitchen. The recipe suggestions and easy navigation make meal planning so much easier.'
  },
  {
    id: 3,
    profilep: image3,
    profileName: 'Aditya Chaplot',
    revieww: 'I love how Recipify simplifies meal planning. Input your ingredients, get dish ideas, and view recipes all in one place. It\'s like having a personal chef!'
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
