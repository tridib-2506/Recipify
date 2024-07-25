import React, { forwardRef } from 'react'
import './popRec.css';
import RepCard from './RepCard'
import image1 from '../../assets/pavv.png'
import image2 from '../../assets/dosa.png'
import image3 from '../../assets/gulab.png'

const popp = [
  {
    id: 1,
    recImage: image1,
    dishName: 'Pav Bhaji',
    prepTime: '🕜 15 min Prep time',
    cookTime: '🕜 35 min Cook time',
    stars: '⭐'.repeat(5),
    recLink: "https://www.indianhealthyrecipes.com/pav-bhaji-recipe-how-to-make-pav-bhaji-step-by-step-pictures/"
  },
  {
    id: 2,
    recImage: image2,
    dishName: 'Masala Dosa',
    prepTime: '🕜 10 min Prep time',
    cookTime: '🕜 60 min Cook time',
    stars: '⭐'.repeat(4),
    recLink: "https://www.indianhealthyrecipes.com/masala-dosa-recipe/"
  },
  {
    id: 3,
    recImage: image3,
    dishName: 'Gulab Jamun',
    prepTime: '🕜 10 min Prep time',
    cookTime: '🕜 20 min Cook time',
    stars: '⭐'.repeat(5),
    recLink: "https://www.indianhealthyrecipes.com/gulab-jamun-recipe-using-milk-powder/"
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
        From over thousands of Indian Recipes, this one's a crowd-pleaser
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
            recLink={item.recLink}
          />
        ))}

      </div>
    </div>
    </section>
    

    </>
  )
});

export default PopularRecipes