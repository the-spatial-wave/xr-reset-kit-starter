// SplashScreen.tsx
// Schermata di ingresso — scompare al click con fade out

import { useState } from 'react'

const LOCAL_VIDEOS = [
  { label: 'video-welcome.mp4', value: '/video/video-welcome.mp4' },
  { label: 'video ambient.mp4', value: '/video/video ambient.mp4' },
]

function toDriveUrl(url: string) {
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  return m ? `https://drive.google.com/uc?export=download&id=${m[1]}` : url
}

interface SplashScreenProps {
  onEnter: () => void
  videoUrl: string
  setVideoUrl: (url: string) => void
}

export function SplashScreen({ onEnter, videoUrl, setVideoUrl }: SplashScreenProps) {
  const [fading, setFading] = useState(false)
  const [inputUrl, setInputUrl] = useState('')
  const [activeTab, setActiveTab] = useState<'file' | 'url' | 'upload'>('file')

  function handleEnter() {
    setFading(true)
    setTimeout(onEnter, 350)
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
        transition: 'opacity 0.35s ease',
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

      {/* Portal Source — 3 metodi */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '2.5rem',
        width: '100%',
        maxWidth: '280px',
      }}>
        {/* Tab bar */}
        <div style={{ display: 'flex', width: '100%', gap: '0.3rem' }}>
          {(['file', 'url', 'upload'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setActiveTab(t); setInputUrl('') }}
              style={{
                flex: 1,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.5rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: activeTab === t ? '#00E5FF' : 'rgba(255,255,255,0.3)',
                background: activeTab === t ? 'rgba(0,229,255,0.08)' : 'transparent',
                border: `1px solid ${activeTab === t ? 'rgba(0,229,255,0.35)' : 'rgba(100,220,255,0.1)'}`,
                padding: '0.35rem',
                cursor: 'pointer',
                borderRadius: '2px',
              }}
            >
              {t === 'file' ? 'File' : t === 'url' ? 'URL' : 'Upload'}
            </button>
          ))}
        </div>

        {/* Tab: File locale */}
        {activeTab === 'file' && (
          <>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', color: 'rgba(159,234,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', alignSelf: 'flex-start' }}>
              File in public/video/
            </div>
            {LOCAL_VIDEOS.map(v => (
              <button
                key={v.value}
                onClick={() => { setVideoUrl(v.value); setInputUrl(v.label) }}
                style={{
                  width: '100%',
                  background: videoUrl === v.value ? 'rgba(0,229,255,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${videoUrl === v.value ? 'rgba(0,229,255,0.4)' : 'rgba(100,220,255,0.12)'}`,
                  borderRadius: '3px',
                  padding: '0.35rem 0.6rem',
                  color: videoUrl === v.value ? '#00E5FF' : 'rgba(255,255,255,0.6)',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.65rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                {v.label}
              </button>
            ))}
            <input
              type="text"
              placeholder="o digita: mio-video.mp4"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && inputUrl.trim()) setVideoUrl('/video/' + inputUrl.trim())
              }}
              style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(100,220,255,0.15)', borderRadius: '4px', padding: '0.5rem 0.8rem', color: '#fff', fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', outline: 'none', boxSizing: 'border-box' }}
            />
          </>
        )}

        {/* Tab: URL esterna */}
        {activeTab === 'url' && (
          <>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', color: 'rgba(159,234,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', alignSelf: 'flex-start' }}>
              Link diretto o Google Drive
            </div>
            <input
              type="text"
              placeholder="https://drive.google.com/file/d/..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(100,220,255,0.15)', borderRadius: '4px', padding: '0.5rem 0.8rem', color: '#fff', fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', outline: 'none', boxSizing: 'border-box' }}
            />
            <button
              onClick={() => { if (inputUrl.trim()) setVideoUrl(toDriveUrl(inputUrl.trim())) }}
              style={{ alignSelf: 'flex-end', fontFamily: "'Orbitron', sans-serif", fontSize: '0.55rem', letterSpacing: '0.1em', color: '#00E5FF', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)', padding: '0.35rem 0.7rem', borderRadius: '2px', cursor: 'pointer', textTransform: 'uppercase' }}
            >
              Confirm
            </button>
          </>
        )}

        {/* Tab: Upload PC */}
        {activeTab === 'upload' && (
          <>
            <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.6rem', color: 'rgba(159,234,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', alignSelf: 'flex-start' }}>
              Carica dal tuo PC
            </div>
            <label style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem',
              letterSpacing: '0.1em', color: inputUrl ? '#00E5FF' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer', textTransform: 'uppercase',
              border: `1px dashed ${inputUrl ? 'rgba(0,229,255,0.5)' : 'rgba(100,220,255,0.25)'}`,
              padding: '0.8rem', borderRadius: '4px', boxSizing: 'border-box',
            }}>
              {inputUrl || 'Scegli file video'}
              <input
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setVideoUrl(URL.createObjectURL(file))
                    setInputUrl(file.name)
                  }
                }}
              />
            </label>
          </>
        )}
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
