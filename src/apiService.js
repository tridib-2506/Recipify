export async function fetchRecipe(dish) {
  try {
    const response = await fetch(`https://recipify-iwnl.onrender.com/recipe?dish=${encodeURIComponent(dish)}`);
    if (!response.ok) {
      throw new Error('Recipe not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
}
