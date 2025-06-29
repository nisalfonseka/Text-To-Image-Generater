const fetch = require('node-fetch');

exports.handler = async function(event) {
  const body = JSON.parse(event.body);

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // Set this in Netlify dashboard

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};