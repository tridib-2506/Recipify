exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({ key: process.env.GEMINI_API_KEY })
  };
};
