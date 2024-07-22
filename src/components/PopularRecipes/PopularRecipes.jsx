import React, { forwardRef } from 'react'
import './popRec.css';
import RepCard from './RepCard'
import image1 from '../../assets/pavv.png'
import image2 from '../../assets/momo.png'
import image3 from '../../assets/gulab.png'

const popp = [
  {
    id: 1,
    recImage: image1,
    dishName: 'Pav Bhaji',
    prepTime: '🕜 15 min Prep time',
    cookTime: '🕜 65 min Prep time',
    stars: '⭐'.repeat(5),
  },
  {
    id: 2,
    recImage: image2,
    dishName: 'Dumplings',
    prepTime: '🕜 10 min Prep time',
    cookTime: '🕜 45 min Prep time',
    stars: '⭐'.repeat(4),
  },
  {
    id: 3,
    recImage: image3,
    dishName: 'Gulab Jamun',
    prepTime: '🕜 20 min Prep time',
    cookTime: '🕜 30 min Prep time',
    stars: '⭐'.repeat(5),
  },
]

const PopularRecipes = forwardRef((props, ref) => {
  return (
    <>
    <section ref={ref} id="popular-recipes">
    <div className='outer'>
      <div className='head1'>
        <div className='heading'>
          Popular Recipes
        </div>
        <div className='tagline'>
        From over thousands of Indian Recipes, this one’s a crowd-pleaser
        </div>
      </div>

      <div className='popu'>
      {popp.map((item) => (
          <RepCard
            key={item.id}
            recImage={item.recImage}
            dishName={item.dishName}
            prepTime={item.prepTime}
            cookTime={item.cookTime}
            stars = {item.stars}
          />
        ))}

      </div>
    </div>
    </section>
    

    </>
  )
});

export default PopularRecipes