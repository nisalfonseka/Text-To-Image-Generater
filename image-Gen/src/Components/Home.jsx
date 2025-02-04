import Waves from './Waves';

const Home = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Waves Background */}
      <div className="absolute inset-0">
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
      
      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
        <p className="text-lg mb-6">Start your journey with us today.</p>
        
      </div>
    </div>
  );
};

export default Home;
