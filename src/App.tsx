import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { XRReset } from './scenes/XRReset'
import { SplashScreen } from './components/SplashScreen'
import { useDeviceDetect } from './hooks/useDeviceDetect'

const LOCAL_VIDEOS = [
  { label: 'video-welcome.mp4', value: '/video/video-welcome.mp4' },
  { label: 'video ambient.mp4', value: '/video/video ambient.mp4' },
]

function toDriveUrl(url: string) {
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  return m ? `https://drive.google.com/uc?export=download&id=${m[1]}` : url
}

export default function App() {
  const { isMobile } = useDeviceDetect()
  const [entered, setEntered] = useState(false)
  const [mode, setMode] = useState<'DEFAULT' | 'VIDEO'>('DEFAULT')
  const [videoUrl, setVideoUrl] = useState<string>('/video/video-welcome.mp4')
  const [tempUrl, setTempUrl] = useState('')
  const [videoTab, setVideoTab] = useState<'file' | 'url' | 'upload'>('file')

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
        
        .dynamic-panel {
          position: fixed;
          bottom: 6.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          opacity: 0;
          transition: all 0.5s ease;
          pointer-events: none;
          width: 320px;
          background: rgba(8, 12, 18, 0.4);
          padding: 1.2rem;
          border-radius: 8px;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(100, 220, 255, 0.1);
        }
        .dynamic-panel.visible {
          opacity: 1;
          pointer-events: all;
        }
        .input-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .url-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(100, 220, 255, 0.2);
          border-radius: 4px;
          padding: 0.5rem 0.8rem;
          color: #fff;
          font-family: 'Manrope', sans-serif;
          font-size: 0.7rem;
          width: 100%;
          outline: none;
          text-align: left;
          transition: border-color 0.3s;
        }
        .url-input:focus {
          border-color: rgba(255, 69, 216, 0.6);
        }
        .actions-row {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.2rem;
        }
        .apply-btn {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: #00E5FF;
          background: rgba(0, 229, 255, 0.1);
          border: 1px solid rgba(0, 229, 255, 0.3);
          padding: 0.4rem 0.8rem;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
        }
        .apply-btn:hover {
          background: rgba(0, 229, 255, 0.2);
          border-color: #00E5FF;
        }
        .file-label {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.55rem;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 2px;
          transition: color 0.3s;
        }
        .file-label:hover {
          color: #fff;
          border-color: #fff;
        }
        .help-text {
          font-family: 'Manrope', sans-serif;
          font-size: 0.55rem;
          color: rgba(255,255,255,0.4);
          text-align: center;
          font-style: italic;
          margin-bottom: 0.2rem;
        }
        .video-tabs {
          display: flex;
          width: 100%;
          gap: 0.3rem;
          margin-bottom: 0.4rem;
        }
        .video-tab {
          flex: 1;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          background: transparent;
          border: 1px solid rgba(100,220,255,0.1);
          padding: 0.35rem;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 2px;
        }
        .video-tab.active {
          color: #00E5FF;
          border-color: rgba(0,229,255,0.4);
          background: rgba(0,229,255,0.08);
        }
        .file-entry-btn {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(100,220,255,0.12);
          border-radius: 3px;
          padding: 0.35rem 0.6rem;
          color: rgba(255,255,255,0.6);
          font-family: 'Manrope', sans-serif;
          font-size: 0.65rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }
        .file-entry-btn:hover, .file-entry-btn.active {
          border-color: rgba(0,229,255,0.4);
          color: #00E5FF;
          background: rgba(0,229,255,0.06);
        }
        .file-label-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          text-transform: uppercase;
          border: 1px dashed rgba(100,220,255,0.25);
          padding: 0.7rem;
          border-radius: 4px;
          transition: all 0.3s;
          margin-top: 0.2rem;
        }
        .file-label-btn:hover {
          border-color: rgba(100,220,255,0.6);
          color: #fff;
          background: rgba(100,220,255,0.05);
        }
      `}</style>

      {!entered && (
        <SplashScreen 
          onEnter={() => setEntered(true)} 
          videoUrl={videoUrl} 
          setVideoUrl={setVideoUrl} 
        />
      )}

      {/* DYNAMIC PORTAL PANEL (V3) */}
      <div className={`dynamic-panel ${entered && mode === 'VIDEO' ? 'visible' : ''}`}>
        {/* Tab selector */}
        <div className="video-tabs">
          {(['file', 'url', 'upload'] as const).map(t => (
            <button
              key={t}
              className={`video-tab ${videoTab === t ? 'active' : ''}`}
              onClick={() => { setVideoTab(t); setTempUrl('') }}
            >
              {t === 'file' ? 'File' : t === 'url' ? 'URL' : 'Upload'}
            </button>
          ))}
        </div>

        {videoTab === 'file' && (
          <div className="input-group">
            <span className="help-text">File in public/video/</span>
            {LOCAL_VIDEOS.map(v => (
              <button
                key={v.value}
                className={`file-entry-btn ${videoUrl === v.value ? 'active' : ''}`}
                onClick={() => setVideoUrl(v.value)}
              >
                {v.label}
              </button>
            ))}
            <input
              className="url-input"
              placeholder="oppure digita: mio-video.mp4"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
            />
            <button className="apply-btn" onClick={() => {
              if (tempUrl.trim()) setVideoUrl('/video/' + tempUrl.trim())
            }}>Apply</button>
          </div>
        )}

        {videoTab === 'url' && (
          <div className="input-group">
            <span className="help-text">Link diretto o Google Drive</span>
            <input
              className="url-input"
              placeholder="https://drive.google.com/file/d/..."
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
            />
            <button className="apply-btn" onClick={() => {
              if (tempUrl.trim()) setVideoUrl(toDriveUrl(tempUrl.trim()))
            }}>Apply Link</button>
          </div>
        )}

        {videoTab === 'upload' && (
          <div className="input-group">
            <span className="help-text">Carica dal tuo PC</span>
            <label className="file-label-btn">
              {tempUrl || 'Scegli file video'}
              <input
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setVideoUrl(URL.createObjectURL(file))
                    setTempUrl(file.name)
                  }
                }}
              />
            </label>
          </div>
        )}
      </div>

      {/* UI CONTROLS */}
      <div className={`ui-controls ${entered ? 'visible' : ''}`}>
        <button
          className={`control-btn ${mode === 'VIDEO' ? 'active' : ''}`}
          onClick={() => setMode(mode === 'VIDEO' ? 'DEFAULT' : 'VIDEO')}
        >
          {mode === 'VIDEO' ? 'Stop Portal' : 'Start Portal'}
        </button>

        {mode === 'DEFAULT' && (
          <button
            className="control-btn"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            onClick={() => {
              if (videoUrl.startsWith('blob:')) URL.revokeObjectURL(videoUrl)
              setVideoUrl('/video/video-welcome.mp4')
              setTempUrl('')
              setVideoTab('file')
              setEntered(false)
              setMode('DEFAULT')
            }}
          >
            Home
          </button>
        )}
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
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          shadows={false}
        >
          <OrbitControls
            target={[0, 1, 0]}
            enablePan={false}
            enableZoom={mode === 'VIDEO'}
            minDistance={isMobile ? 2 : 1.5}
            maxDistance={isMobile ? 10 : 5}
            zoomSpeed={0.8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate={mode === 'DEFAULT'}
            autoRotateSpeed={0.4}
          />

          <XRReset mode={mode} entered={entered} videoUrl={videoUrl} />
        </Canvas>
      </div>
    </>
  )
}
