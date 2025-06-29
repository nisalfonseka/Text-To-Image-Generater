import React, { useState } from 'react';
import axios from 'axios';
import { Download, Wand2 } from 'lucide-react';
import Waves from './Waves';


function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showGetStarted, setShowGetStarted] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImage('');
    
    try {
      const response = await fetch('/.netlify/functions/openrouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "What is in this image?" },
                { type: "image_url", image_url: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg" } }
              ]
            }
          ]
        })
      });
      const data = await response.json();
      if (data.image) {
        setImage(data.image);
      } else {
        throw new Error('No image data received');
      }
    } catch (err) {
      setError(err.response?.data?.details || 'Failed to generate image. Please try again.');
      console.error('Error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
  const GetStartedSection = ({ onGetStarted }) => {
    return (
      <div className="min-h-screen flex items-center justify-center text-white px-4 py-12">
        <div className="max-w-3xl w-full text-center">
          {/* Logo */}
          <div className="mb-8">
            <img src="/vite1.svg" alt="Logo" className="w-32 h-32 mx-auto animate-spin-wheel" />
          </div>
  
          {/* Get Started Button */}
          <div className="flex justify-center">

          <button
  onClick={onGetStarted}
  className="absolute flex items-center justify-center gap-2 py-3 px-6 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-[0_4px_14px_0_rgba(255,255,255,0.3)]"
>
  Get Started
  {/* Add an SVG icon (e.g., a right arrow) */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>

            
          </button>
        </div><style jsx>{`
        @keyframes spin-wheel {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-wheel {
          animation: spin-wheel 10s linear infinite;
          transform-origin: center; /* Ensure rotation happens around the center */
        }
      `}</style>
      </div></div>
    );
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGetStarted = () => {
    setShowGetStarted(false);
  };

  return (
    <div >
      <div className='fixed inset-0 min-h-screen w-full'>
        <Waves
          lineColor="#fff"
          backgroundColor="#000"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>
      
      {showGetStarted ? (
        <GetStartedSection onGetStarted={handleGetStarted} />
      ) : (
        <div className="min-h-screen flex items-center justify-center text-white px-4 py-12">
          <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4 tracking-tight text-white">
                AI Image Generator
              </h1>
              <p className="text-lg text-white/80">
                Turn words into stunning visuals instantly
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex items-center gap-4">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 px-3 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 resize-none"
                rows="1"
                placeholder="A futuristic city with neon lights and flying cars..."
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 py-3 px-6 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0116 0H4z"
                      ></path>
                    </svg>
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Generate Image
                  </>
                )}
              </button>
            </form>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 backdrop-blur-lg text-white p-4 rounded-xl mt-6 text-center">
                {error}
              </div>
            )}

            {/* Generated Image */}
            {image && (
              <div className="mt-8 p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl">
                <img
                  src={image}
                  alt="Generated artwork"
                  className="w-full rounded-lg shadow-lg mb-4"
                  onError={() => setError('Failed to load the generated image')}
                />
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-black hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  Download Image
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;