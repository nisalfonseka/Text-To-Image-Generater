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
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-4 flex-wrap sm:flex-nowrap"
            >
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 px-3 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 resize-none min-w-[180px]"
                rows="1"
                placeholder="A futuristic city with neon lights and flying cars..."
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 py-3 px-6 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 w-full sm:w-auto mt-4 sm:mt-0"
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
            <style>{`
              @media (max-width: 640px) {
                form.flex { flex-direction: column !important; align-items: stretch !important; }
                form.flex button { width: 100% !important; margin-top: 1rem !important; }
              }
            `}</style>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 backdrop-blur-lg text-white p-4 rounded-xl mt-6 text-center">
                {error}
              </div>
            )}

            {/* Generated Image */}
            {image && (
              <div className="mt-10 flex flex-col items-center justify-center">
    <div className="relative group rounded-3xl p-[2px] bg-gradient-to-tr from-pink-500 via-blue-500 to-purple-500 shadow-2xl transition-all duration-300 hover:scale-105 w-full max-w-lg sm:max-w-md xs:max-w-full">
      <div className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 flex flex-col items-center w-full animate-float">
        <img
          src={image}
          alt="Generated artwork"
          className="rounded-2xl shadow-xl w-full object-cover border-4 border-white/20 group-hover:shadow-pink-500/30 transition-all duration-300 max-h-[400px] sm:max-h-[300px] xs:max-h-[200px]"
          onError={() => setError('Failed to load the generated image')}
        />
        <button
          onClick={handleDownload}
          className="mt-6 flex items-center gap-3 px-7 py-3 bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-pink-500 hover:to-purple-500 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 w-full sm:w-auto text-base sm:text-sm"
        >
          <Download className="w-6 h-6" />
          <span className="hidden xs:inline">Download Image</span>
          <span className="inline xs:hidden">Download</span>
        </button>
      </div>
      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-300 bg-gradient-to-tr from-pink-400 via-blue-400 to-purple-400 z-[-1]" />
    </div>
    <style>{`
      @keyframes float {
        0% { transform: translateY(0px);}
        50% { transform: translateY(-10px);}
        100% { transform: translateY(0px);}
      }
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }
      @media (max-width: 640px) {
        .max-w-lg { max-width: 100% !important; }
        .p-6 { padding: 1rem !important; }
        .rounded-3xl { border-radius: 1.25rem !important; }
        .max-h-[400px] { max-height: 200px !important; }
      }
      @media (max-width: 400px) {
        .p-6 { padding: 0.5rem !important; }
        .rounded-3xl { border-radius: 0.75rem !important; }
        .max-h-[400px] { max-height: 120px !important; }
        .px-7 { padding-left: 1rem !important; padding-right: 1rem !important; }
        .py-3 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
        .text-base { font-size: 0.9rem !important; }
      }
    `}</style>
  </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;