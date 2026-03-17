import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { XRReset } from './scenes/XRReset'
import { SplashScreen } from './components/SplashScreen'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [mode, setMode] = useState<'DEFAULT' | 'VIDEO'>('DEFAULT')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Manrope:wght@400;500;700&display=swap');
        
        .ui-controls {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          display: flex;
          gap: 1.5rem;
          pointer-events: none;
          opacity: 0;
          transition: opacity 1s ease 0.5s;
        }
        .ui-controls.visible {
          pointer-events: all;
          opacity: 1;
        }
        .control-btn {
          background: rgba(8, 12, 18, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(100, 220, 255, 0.3);
          color: #fff;
          font-family: 'Orbitron', sans-serif;
          padding: 0.8rem 2rem;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 4px;
        }
        .control-btn:hover {
          background: rgba(100, 220, 255, 0.15);
          border-color: rgba(100, 220, 255, 0.8);
          box-shadow: 0 0 20px rgba(100, 220, 255, 0.2);
        }
        .control-btn.active {
          border-color: #ff45d8;
          color: #ff45d8;
          box-shadow: 0 0 20px rgba(255, 69, 216, 0.2);
        }
      `}</style>

      {!entered && <SplashScreen onEnter={() => setEntered(true)} />}

      {/* UI CONTROLS */}
      <div className={`ui-controls ${entered ? 'visible' : ''}`}>
        <button 
          className={`control-btn ${mode === 'VIDEO' ? 'active' : ''}`}
          onClick={() => setMode('VIDEO')}
        >
          {mode === 'VIDEO' ? 'Playing' : 'Start Portal'}
        </button>
        <button 
          className="control-btn"
          onClick={() => setMode('DEFAULT')}
        >
          Reset Focus
        </button>
      </div>

      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          background: '#04000d',
        }}
      >
        <Canvas
          camera={{ position: [0, 1.5, 4], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          shadows={false}
        >
          <OrbitControls
            target={[0, 1, 0]}
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate={mode === 'DEFAULT'}
            autoRotateSpeed={0.4}
          />

          <XRReset mode={mode} entered={entered} />
        </Canvas>
      </div>
    </>
  )
}
