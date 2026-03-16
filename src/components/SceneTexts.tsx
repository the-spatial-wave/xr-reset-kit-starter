import { Html } from '@react-three/drei'
import { useDeviceDetect } from '../hooks/useDeviceDetect'

export function SceneTexts() {
  const { isMobile } = useDeviceDetect()

  if (isMobile) return null

  return (
    <>
      {/* TITOLO + SOTTOTITOLO — in alto centrato */}
      <Html
        position={[0, 5.8, -1.2]}
        occlude={false}
        zIndexRange={[1, 10]}
        center
      >
        <div style={{ textAlign: 'center', pointerEvents: 'none', userSelect: 'none' }}>
          <div
            style={{
              fontFamily: "'Orbitron', 'Arial Black', Arial, sans-serif",
              fontSize: '58px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '6px',
              lineHeight: 1,
              marginBottom: '14px',
              textShadow: '0 0 40px rgba(100, 80, 255, 0.9), 0 0 80px rgba(100, 80, 255, 0.4)',
            }}
          >
            XR RESET
          </div>
          <div
            style={{
              fontFamily: "'Manrope', Arial, sans-serif",
              fontSize: '17px',
              color: '#00E5FF',
              letterSpacing: '2.5px',
              fontWeight: 400,
              textShadow: '0 0 20px rgba(0, 229, 255, 0.6)',
            }}
          >
            Build your first XR space
          </div>
        </div>
      </Html>

      {/* BRAND LABEL — in basso */}
      <Html
        position={[0, 0.08, 1.8]}
        occlude={false}
        zIndexRange={[1, 10]}
        center
      >
        <div
          style={{
            fontFamily: "'Orbitron', Arial, sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            color: '#C8CCD6',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 0.85,
          }}
        >
          THE SPATIAL WAVE
        </div>
      </Html>
    </>
  )
}
