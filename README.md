# Recipify: Culinary Inspiration at Your Fingertips
## Unlock Deliciousness with Just a Few Ingredients!

Stuck in a cooking rut? Let Recipify be your kitchen savior! Simply enter the ingredients you have, and our app will magically transform them into mouthwatering dish suggestions. No more second-guessing or recipe hunting—we've got that covered too! Click on any suggested dish to reveal a step-by-step recipe, ensuring your cooking journey is as smooth as possible. Discover new flavors, cook with confidence, and enjoy every meal. Dive into the world of effortless cooking with Recipify—your culinary companion!

### Steps to run the application 

1. Install Required Packages
   * Open your terminal and navigate to the project directory.
   * Install all the required Python packages by running : **pip install -r requirements.txt**
    
2. Set Up Gemini API Key
   * Obtain your Gemini API Key from the Google Gemini API official website.
   * Open 'geminiService.jsx' and insert your API key at the 'API_KEY' variable on the second line.

3. Install Node.js Packages
   * In the terminal, ensure you are in the project directory.
   * Install the required Node.js packages by running : **npm install**
  
4. Run the Backend Server
   * Start the backend server by running : **python scraper.py**
   * If you are using a Mac, you may need to use : **python3 scraper.py**

5. Start the Frontend Server
   * Open a new terminal in the project directory.
   * Run the following command to start the frontend server : **npm run dev**
  
6. Access the Application
   * In the terminal, you will see a link provided by the development server.
   * Open the link by holding 'Ctrl' (or 'Cmd' on Mac) and clicking the link.

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
