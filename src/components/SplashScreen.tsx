// SplashScreen.tsx
// Schermata di ingresso — scompare al click con fade out

import { useState } from 'react'

interface SplashScreenProps {
  onEnter: () => void
}

export function SplashScreen({ onEnter }: SplashScreenProps) {
  const [fading, setFading] = useState(false)

  function handleEnter() {
    setFading(true)
    setTimeout(onEnter, 700)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#04000d',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Glow background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, rgba(100,0,180,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Titolo */}
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(2.2rem, 8vw, 5rem)',
        fontWeight: 900,
        color: '#ffffff',
        letterSpacing: '0.12em',
        textAlign: 'center',
        textShadow: '0 0 40px rgba(100,220,255,0.5), 0 0 80px rgba(100,220,255,0.2)',
        marginBottom: '0.5rem',
      }}>
        XR RESET
      </div>

      {/* Sottotitolo */}
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(0.7rem, 2vw, 1rem)',
        fontWeight: 400,
        color: '#9feaff',
        letterSpacing: '0.2em',
        textAlign: 'center',
        marginBottom: '3.5rem',
        textTransform: 'uppercase',
      }}>
        Build your first XR space
      </div>

      {/* CTA Button */}
      <button
        onClick={handleEnter}
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
          fontWeight: 700,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#ffffff',
          background: 'transparent',
          border: '1px solid rgba(100,220,255,0.5)',
          borderRadius: '2px',
          padding: '1rem 2.5rem',
          cursor: 'pointer',
          transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
          boxShadow: '0 0 20px rgba(100,220,255,0.1)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.borderColor = 'rgba(100,220,255,0.9)'
          el.style.boxShadow = '0 0 30px rgba(100,220,255,0.3)'
          el.style.background = 'rgba(100,220,255,0.06)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.borderColor = 'rgba(100,220,255,0.5)'
          el.style.boxShadow = '0 0 20px rgba(100,220,255,0.1)'
          el.style.background = 'transparent'
        }}
      >
        Enter Experience
      </button>

      {/* Branding */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(0.55rem, 1.2vw, 0.7rem)',
        fontWeight: 500,
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
      }}>
        The Spatial Wave
      </div>
    </div>
  )
}
