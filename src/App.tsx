import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { XRReset } from './scenes/XRReset'
import { SplashScreen } from './components/SplashScreen'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [videoMode, setVideoMode] = useState(false)

  return (
    <>
      {/* Font Orbitron da Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');`}</style>

      {!entered && <SplashScreen onEnter={() => setEntered(true)} />}

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
            autoRotate={!videoMode}
            autoRotateSpeed={0.4}
            enabled={!videoMode}
          />

          <XRReset videoMode={videoMode} />
        </Canvas>
      </div>

      {/* ── UI OVERLAY — pulsante play/stop ── */}
      {entered && (
        <button
          onClick={() => setVideoMode(v => !v)}
          style={{
            position: 'fixed',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(0.6rem, 1.2vw, 0.72rem)',
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: videoMode ? '#ff45d8' : '#9feaff',
            background: 'transparent',
            border: `1px solid ${videoMode ? 'rgba(255,69,216,0.55)' : 'rgba(100,220,255,0.45)'}`,
            borderRadius: '2px',
            padding: '0.75rem 2rem',
            cursor: 'pointer',
            transition: 'color 0.4s, border-color 0.4s, box-shadow 0.4s',
            boxShadow: videoMode
              ? '0 0 22px rgba(255,69,216,0.25)'
              : '0 0 18px rgba(100,220,255,0.12)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.boxShadow = videoMode
              ? '0 0 36px rgba(255,69,216,0.45)'
              : '0 0 32px rgba(100,220,255,0.3)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.boxShadow = videoMode
              ? '0 0 22px rgba(255,69,216,0.25)'
              : '0 0 18px rgba(100,220,255,0.12)'
          }}
        >
          {videoMode ? '■  Stop' : '▶  Play'}
        </button>
      )}
    </>
  )
}
