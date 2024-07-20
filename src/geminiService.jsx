import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = ""; // Replace with your actual Gemini API key

const genAI = new GoogleGenerativeAI(API_KEY);

export async function getDishSuggestions(ingredients) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Suggest 5 Indian dishes that can be made using some or all of these ingredients: ${ingredients}. Only provide the names of the dishes, separated by commas.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  return text.split(',').map(dish => dish.trim());
}
