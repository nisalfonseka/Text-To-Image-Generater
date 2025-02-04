const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await axios.post('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      text_prompts: [
        {
          text: prompt,
          weight: 1
        }
      ],
      cfg_scale: 7,
      height: 1024,
      width: 1024,
      steps: 30,
      samples: 1
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',  // Changed back to application/json
        'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`
      },
      responseType: 'json'  // Ensure we get JSON response
    });

    // The response includes base64 encoded image
    const generatedImage = response.data.artifacts[0].base64;
    const imageUrl = `data:image/png;base64,${generatedImage}`;
    
    res.json({ image: imageUrl });
  } catch (error) {
    console.error('Error details:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.response?.data || error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});