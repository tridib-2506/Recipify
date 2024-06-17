import { useState } from 'react'
import axios from "axios";
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const fetchDishes = async () => {
    try {
      console.log('loading..')
      // const response = await axios.get(`YOUR_API_ENDPOINT?ingredient=${input}`);
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyBZ94tqY-P3Z7l5py_Bb9__KCz4ADwcA7I",
        method: "post",
        data: {"contents":[
          {"parts":[
            {"text": `Give me five famous indian dishes which can me made using ${input}?`}
          ]}
          ]
        },
      })
      // console.log(response)
      console.log(response['data']['candidates'][0]['content']["parts"][0]["text"])
      setRecipes(response['data']['candidates'][0]['content']["parts"][0]["text"]); // Adjust based on the API response structure
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDishes();
  };

  return (
    <>
      <header>
        <h1>Recipify</h1>
      </header>
      <main>
        <h2>Enter raw material that you have:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="e.g., tomatoes, chicken"
          />
          <button type="submit">Get Dishes</button>
        </form>
        <div className="recipes">
          {recipes.length > 0 ? (
            <p>{recipes}</p>
            // <ul>
            //   {recipes.map((recipe, index) => (
            //     <li key={index}>{recipe.name}</li> // Adjust based on API response structure
            //   ))}
            // </ul>
          ) : (
            <p>No recipes found. Please try different ingredients.</p>
          )}
        </div>
      </main>
    </>
  )
}

export default App