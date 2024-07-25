from flask import Flask, jsonify
from seleniumbase import get_driver
from selenium.get_driver.chrome.service import Service as ChromeService
from selenium.get_driver.common.by import By
from selenium.get_driver.chrome.options import Options
import os

app = Flask(__name__)

@app.route('/')
def home():
    return "Selenium-Wire is working"

@app.route('/scrape')
def scrape():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    service = ChromeService(executable_path="/usr/local/bin/chromedriver")
    driver = get_driver.Chrome(service=service, options=chrome_options)

    try:
        driver.get("https://www.google.com")
        title = driver.title
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        driver.quit()

    return jsonify({"title": title})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
