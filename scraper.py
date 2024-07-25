import traceback
from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, ElementNotInteractableException
import time
import re
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

import os
API_KEY = os.getenv("GEMINI_API_KEY")

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes


def split_recipe(recipe_text):
    # Split the text at 'INSTRUCTIONS'
    parts = recipe_text.split('INSTRUCTIONS', 1)
    
    if len(parts) != 2:
        parts = recipe_text.split('Instructions', 1)
    
    if len(parts) != 2:
        return None, None  # If 'INSTRUCTIONS' is not found
    
    ingredients = parts[0].strip()
    instructions = 'INSTRUCTIONS' + parts[1].strip()
    
    # Clean up the ingredients
    ingredients = ingredients.replace('INGREDIENTS', '\n', 1)
    ingredients = ingredients.replace('**Ingredients:**', '\n', 1)
    ingredients = ingredients.replace('•', '\n•').strip()
    
    # Clean up the instructions
    instructions = instructions.replace('INSTRUCTIONS', '\n', 1)
    instructions = instructions.replace(':**', '\n', 1)
    instructions = instructions.replace('•', '\n•').strip()
    
    return ingredients, instructions


def scrape_recipe(dish):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920x1080")
    try:
        driver = webdriver.Chrome(options=chrome_options)
        # driver = webdriver.Chrome(options=chrome_options)
    except Exception as e:
        return {"error": f"Failed to initialize WebDriver: {str(e)}"}
    
    try:
        url = 'https://www.indianhealthyrecipes.com/'
        driver.get(url)
        
        wait = WebDriverWait(driver, 10)
        
        search_toggle = wait.until(EC.element_to_be_clickable((By.TAG_NAME, 'button')))
        search_toggle.click()
        
        search_box = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'search-field')))
        search_box.send_keys(dish)
        
        search_submit = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'search-submit')))
        search_submit.click()
        
        # time.sleep(2)
        
        search_results = driver.find_elements(By.TAG_NAME, 'a')
        recipe_found = False
        
        for result in search_results:
            if dish.lower() in result.text.lower():
                recipe_link = result.get_attribute("href")
                driver.get(recipe_link)
                recipe_found = True
                
                visible_text = driver.find_element(By.TAG_NAME, 'body').text
                start_index = visible_text.find("INGREDIENTS")
                end_index = visible_text.find("NOTES")
                
                if end_index == -1:
                    end_index = visible_text.find("VIDEO")
                if end_index == -1:
                    end_index = visible_text.find("NUTRITION INFO")
                
                if start_index != -1 and end_index != -1:
                    ingredients_text = visible_text[start_index:end_index].strip()
                    ingredients_text = re.sub(r'▢\s*\n*', ' • ', ingredients_text)
                    ingredients_text = ingredients_text.replace("INGREDIENTS ", "\n", 1)
                    ingredients_text = re.sub(r'(INSTRUCTIONS)', r'\1\n', ingredients_text)
                    
                    ingredients, instructions = split_recipe(ingredients_text)
                    # print(instructions)
                    
                    return {
                        "recipe_link": recipe_link,
                        "ingredients": ingredients,
                        "instructions": instructions,
                    }
                else:
                    return {"error": "Couldn't find 'INGREDIENTS' or the end marker in the visible text."}
        
        if not recipe_found:
            return {"error": "No matching recipe found."}
    
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}\n{traceback.format_exc()}"}
    
    finally:
        driver.quit()

def fetch_dishes(dish):
    url = f"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key={API_KEY}"
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "contents": [
            {
                "parts": [
                    {"text": f"Give me recipe of Indian dish: {dish} with just Ingredients and Instructions?"}
                ]
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        
        response_data = response.json()
        recipe = response_data['candidates'][0]['content']['parts'][0]['text']
        file_path = "temp_recipe.txt"
        with open(file_path, 'w') as file:
            file.write(recipe)
        # rec = re.sub(r'\*+', '*', recipe).replace('*', '\n•')
        # rec = recipe.replace('*', '\n•')
        ingredients, instructions = split_recipe(recipe)
        
        return {
            "ingredients": ingredients,
            "instructions": instructions,
        }        
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"Error occurred: {err}")
        
        
@app.route('/recipe', methods=['GET'])
def get_recipe():
    dish = request.args.get('dish')
    if not dish:
        return jsonify({"error": "Please provide a dish name."}), 400
    
    result = scrape_recipe(dish)
    if "error" in result:
        result = fetch_dishes(dish)
    
    if "error" in result:
        return jsonify(result), 404
    else:
        return jsonify(result), 200

@app.route('/')
def home():
    return "Welcome to the Recipe Scraper API. Use /recipe?dish=DISH_NAME to get a recipe."

if __name__ == '__main__':
    app.run(debug=True)
