
import { GoogleGenerativeAI } from "@google/generative-ai";

let apiKey = null;

async function getApiKey() {
  if (apiKey) return apiKey;
  const response = await fetch('/.netlify/functions/getGeminiKey', { method: 'POST' });
  const data = await response.json();
  apiKey = data.key;
  return apiKey;
}

export async function getDishSuggestions(ingredients) {
  const key = await getApiKey();
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Suggest 5 Indian dishes that can be made using some or all of these ingredients: ${ingredients}. Only provide the names of the dishes, separated by commas.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text.split(',').map(dish => dish.trim());
}
